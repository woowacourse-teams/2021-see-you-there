package seeuthere.goodday.location.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import seeuthere.goodday.location.config.Requesters;
import seeuthere.goodday.location.domain.algorithm.DuplicateStationRemover;
import seeuthere.goodday.location.domain.algorithm.StationGrades;
import seeuthere.goodday.location.domain.combiner.AxisKeywordCombiner;
import seeuthere.goodday.location.domain.location.MiddlePoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.domain.location.WeightStations;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.dto.api.response.APIAxisDocument;
import seeuthere.goodday.location.dto.api.response.APILocationDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.LocationResponse;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.response.SpecificLocationResponse;
import seeuthere.goodday.location.dto.response.UtilityResponse;
import seeuthere.goodday.location.temp.PathCandidate;
import seeuthere.goodday.location.temp.PathData;
import seeuthere.goodday.location.temp.RedisSaveSet;
import seeuthere.goodday.location.temp.RedisSaver;
import seeuthere.goodday.location.temp.StationPoint;
import seeuthere.goodday.location.util.LocationCategory;
import seeuthere.goodday.path.domain.Path;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.PointWithName;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.repository.TransportRedisRepository;
import seeuthere.goodday.path.service.PathService;

@Service
public class LocationService {

    private final Requesters requesters;
    private final PathService pathService;
    private final TransportRedisRepository transportRedisRepository;
    private final WeightStations weightStations;

    public LocationService(Requesters requesters,
        PathService pathService,
        TransportRedisRepository transportRedisRepository,
        WeightStations weightStations) {
        this.requesters = requesters;
        this.pathService = pathService;
        this.transportRedisRepository = transportRedisRepository;
        this.weightStations = weightStations;
    }

    public List<SpecificLocationResponse> findAddress(double x, double y) {
        List<APILocationDocument> apiLocationDocuments = requesters.location().requestAddress(x, y);

        return toSpecificLocationResponse(apiLocationDocuments);
    }

    private List<SpecificLocationResponse> toSpecificLocationResponse(
        List<APILocationDocument> apiLocationDocuments) {
        return apiLocationDocuments.stream()
            .map(SpecificLocationResponse::new)
            .collect(Collectors.toList());
    }

    public List<LocationResponse> findAxis(String address) {
        AxisKeywordCombiner axisKeywordCombiner = combinedAxisKeywordCombiner(
            address, requesters.coordinate(), requesters.search());

        return toLocationResponse(axisKeywordCombiner);
    }

    private AxisKeywordCombiner combinedAxisKeywordCombiner(String address,
        CoordinateRequester coordinateRequester, SearchRequester searchRequester) {
        List<APIAxisDocument> exactAddressResult = coordinateRequester.requestCoordinate(address);
        List<APIUtilityDocument> keyWordResult = searchRequester.requestSearch(address);

        return AxisKeywordCombiner.valueOf(exactAddressResult,
            keyWordResult);
    }

    private List<LocationResponse> toLocationResponse(AxisKeywordCombiner axisKeywordCombiner) {
        return axisKeywordCombiner.getLocations()
            .stream()
            .map(LocationResponse::new)
            .collect(Collectors.toList());
    }

    public List<UtilityResponse> findUtility(String category, double x, double y) {
        String categoryCode = LocationCategory.translatedCode(category);
        List<APIUtilityDocument> apiUtilityDocuments = requesters.utility()
            .requestUtility(categoryCode, x, y);
        return toUtilityResponse(apiUtilityDocuments);
    }

    public List<UtilityResponse> findSearch(String keyword) {
        List<APIUtilityDocument> apiUtilityDocuments = requesters.search().requestSearch(keyword);
        return toUtilityResponse(apiUtilityDocuments);
    }

    private List<UtilityResponse> toUtilityResponse(List<APIUtilityDocument> apiUtilityDocuments) {
        return apiUtilityDocuments.stream()
            .map(UtilityResponse::new)
            .collect(Collectors.toList());
    }

    public MiddlePointResponse findMiddlePoint(LocationsRequest locationsRequest) {
        Points userStartPoints = Points.valueOf(locationsRequest);
        Map<Point, Mono<APIUtilityResponse>> nearbyStations = requesters.utility()
            .findNearbyStations(userStartPoints);

        List<StationPoint> candidateDestinations = findMiddleStations(userStartPoints);
        List<PathCandidate> pathCandidates = allCrossCase(userStartPoints, candidateDestinations, nearbyStations);

        List<Paths> transportPathResults = getPaths(pathCandidates);

        Point terminalPoint = calculateMiddlePoint(userStartPoints, candidateDestinations, transportPathResults);

        return new MiddlePointResponse(terminalPoint.getX(), terminalPoint.getY());
    }

    private List<Paths> getPaths(List<PathCandidate> pathCandidates) {
        List<Paths> transportPathResults = new ArrayList<>();

        List<PathCandidate> uncachedResults = extractedUncachedResults(pathCandidates, transportPathResults);

        List<PathData> subWayPathData = pathService.findSubwayPaths(uncachedResults);
        List<PathData> busPathData = pathService.findBusPaths(pathCandidates);

        List<Paths> pathsList = generatedPaths(subWayPathData, RedisSaveSet.SUBWAY.getRedisSaver());

        transportPathResults.addAll(pathsList);
        transportPathResults
            .addAll(generatedPaths(busPathData, RedisSaveSet.DEFAULT.getRedisSaver()));
        return transportPathResults;
    }

    private List<PathCandidate> extractedUncachedResults(List<PathCandidate> pathCandidates,
        List<Paths> transportPathResults) {
        return pathCandidates.parallelStream()
            .filter(pathCandidate -> {
                Optional<TransportCache> optionalPathResult = findBySubwayId(
                    pathCandidate);
                return extracted(transportPathResults, pathCandidate, optionalPathResult);
            }).collect(Collectors.toList());
    }

    // todo - 함수면 변경 고민
    private boolean extracted(List<Paths> transportPathResults, PathCandidate pathCandidate,
        Optional<TransportCache> optionalPathResult) {
        if (optionalPathResult.isPresent()) {
            Paths paths = optionalPathResult.get().getPaths();

            Point startPoint = pathCandidate.getUserPoint();
            Point endPoint = pathCandidate.getDestination().getPoint();
            transportPathResults.add(calibratedWalkPath(paths, startPoint, endPoint));
            return false;
        }
        return true;
    }

    private Optional<TransportCache> findBySubwayId(PathCandidate pathCandidate) {
        APIUtilityDocument apiUtilityDocument = pathCandidate.apiUtilityDocument();
        Point targetPoint = pathCandidate.getDestination().getPoint();
        return transportRedisRepository.findById(
            redisId(apiUtilityDocument, targetPoint));
    }

    private Point calculateMiddlePoint(Points userStartPoints,
        List<StationPoint> candidateDestinations,
        List<Paths> transportPathResults) {
        Map<Point, Map<Point, Path>> pathFromSourceToTarget = mapPath(transportPathResults);

        StationGrades stationGrades = StationGrades
            .valueOf(userStartPoints, candidateDestinations, pathFromSourceToTarget);

        StationPoint terminalStationPoint = stationGrades.findStationPoint();
        return terminalStationPoint.getPoint();
    }

    // todo - 함수면 변경 고민
    private Map<Point, Map<Point, Path>> mapPath(List<Paths> transportPaths) {
        Map<Point, Map<Point, Path>> pathFromSourceToTarget = new HashMap<>();
        for (Paths paths : transportPaths) {
            Path path = paths.getPathRegistry().get(0);
            Point startPoint = paths.getStartPoint();
            Point endPoint = paths.getEndPoint();
            Map<Point, Path> pointKeyValuePath = pathFromSourceToTarget
                .getOrDefault(endPoint, new HashMap<>());
            insert(pointKeyValuePath, startPoint, path);
            pathFromSourceToTarget.put(endPoint, pointKeyValuePath);
        }
        return pathFromSourceToTarget;
    }
    // todo - 함수명 변경
    public void insert(Map<Point, Path> pointKeyValuePath, Point startPoint, Path path) {
        if (pointKeyValuePath.containsKey(startPoint)) {
            Path minPath = minPath(path, pointKeyValuePath.get(startPoint));
            pointKeyValuePath.put(startPoint, minPath);
            return;
        }
        pointKeyValuePath.put(startPoint, path);
    }

    private List<Paths> generatedPaths(List<PathData> transportPathDates, RedisSaver redissaver) {
        return transportPathDates.parallelStream()
            .map(pathData -> {
                    APITransportResponse transportResponse = pathData.apiTransportResponse();
                    PathCandidate pathCandidate = pathData.getPathCandidate();

                    PathsResponse pathsResponse = PathsResponse.valueOf(
                        Objects.requireNonNull(transportResponse).getMsgBody());
                    Point startPoint = pathCandidate.getUserPoint();
                    Point endPoint = pathCandidate.getDestination().getPoint();
                    Paths paths = pathsResponse.toPaths(startPoint, endPoint);
                    redissaver.save(pathCandidate, transportRedisRepository, paths);
                    return calibratedWalkPath(paths, startPoint, endPoint);
                }
            )
            .collect(Collectors.toList());
    }

    private String redisId(APIUtilityDocument apiUtilityDocument, Point targetPoint) {
        return "subway:" + new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY())
            + targetPoint;
    }

    private Paths calibratedWalkPath(Paths paths, Point startPoint, Point endPoint) {
        PointWithName startPointWithName = new PointWithName(startPoint, "출발점");
        PointWithName endPointWithName = new PointWithName(endPoint, "도착점");
        Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
        walkWithPaths.sort();
        return walkWithPaths;
    }

    private Path minPath(Path busPath, Path subwayPath) {
        if (busPath.getTime() < subwayPath.getTime()) {
            return busPath;
        }
        return subwayPath;
    }

    private List<PathCandidate> allCrossCase(Points userStartPoints,
        List<StationPoint> candidateDestinations,
        Map<Point, Mono<APIUtilityResponse>> nearbyStations) {
        List<PathCandidate> pathCandidates = new ArrayList<>();
        // todo - flatMap 으로 변경 가능하다면 변경하기
        for (Point startPoint : userStartPoints.getPointRegistry()) {
            for (StationPoint stationPoint : candidateDestinations) {
                pathCandidates
                    .add(new PathCandidate(startPoint, nearbyStations.get(startPoint),
                        stationPoint));
            }
        }
        return pathCandidates;
    }

    private List<StationPoint> findMiddleStations(Points points) {
        MiddlePoint userMiddlePoint = MiddlePoint.valueOf(points);
        List<StationPoint> stationPoints = new ArrayList<>();

        for (UtilityResponse utilityResponse : findSubway(userMiddlePoint.getX(),
            userMiddlePoint.getY())) {
            stationPoints
                .add(new StationPoint(utilityResponse.getPlaceName(), utilityResponse.getX(),
                    utilityResponse.getY()));
        }

        Set<String> keys = weightStations.getKeys();
        for (String key : keys) {
            insertWeight(stationPoints, key);
        }

        DuplicateStationRemover duplicateStationRemover = new DuplicateStationRemover(
            stationPoints);
        return duplicateStationRemover.result();
    }

    private void insertWeight(List<StationPoint> candidateDestinations, String key) {
        Point point = weightStations.get(key);
        StationPoint stationPoint = new StationPoint(key, point);
        candidateDestinations.add(stationPoint);
    }

    private List<UtilityResponse> findSubway(double x, double y) {
        List<APIUtilityDocument> apiUtilityDocuments = requesters.utility().requestSubway(x, y);
        return toUtilityResponse(apiUtilityDocuments);
    }
}
