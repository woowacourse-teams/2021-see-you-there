package seeuthere.goodday.location.service;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import seeuthere.goodday.location.config.Requesters;
import seeuthere.goodday.location.domain.StationPoints;
import seeuthere.goodday.location.domain.TerminalPoint;
import seeuthere.goodday.location.domain.combiner.AxisKeywordCombiner;
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
import seeuthere.goodday.location.util.LocationCategory;
import seeuthere.goodday.path.domain.CalibratedWalkPath;
import seeuthere.goodday.path.domain.PathCandidate;
import seeuthere.goodday.path.domain.PathCandidates;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.domain.api.Paths;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.repository.TransportRedisRepository;
import seeuthere.goodday.path.repository.support.RedisSaveSet;
import seeuthere.goodday.path.repository.support.RedisSaver;
import seeuthere.goodday.path.service.PathService;

@Service
public class LocationService {

    private static final long LIMIT_TIME = 2_000L;

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
        Map<Point, APIUtilityResponse> nearbyStations = requesters.utility()
            .findNearbyStations(userStartPoints);

        StationPoints stationPoints = StationPoints
            .valueOf(userStartPoints, weightStations, requesters);
        PathCandidates pathCandidates = PathCandidates
            .valueOf(userStartPoints, stationPoints, nearbyStations);

        List<Paths> transportPathResults = getPaths(pathCandidates.getPathCandidateRegistry());

        TerminalPoint terminalPoint = TerminalPoint
            .valueOf(userStartPoints, stationPoints, transportPathResults);
        return new MiddlePointResponse(terminalPoint.getX(), terminalPoint.getY());
    }

    private List<Paths> getPaths(List<PathCandidate> pathCandidates) {
        List<Paths> transportPathResults = new ArrayList<>();

        List<PathCandidate> uncachedResults = extractedUncachedResults(pathCandidates,
            transportPathResults);

        Map<PathCandidate, APITransportResponse> subWayPathData = pathService
            .findSubwayPaths(uncachedResults);
        Map<PathCandidate, APITransportResponse> busPathData = pathService
            .findBusPaths(pathCandidates);

        List<Paths> pathsList = generatedPaths(uncachedResults, subWayPathData,
            RedisSaveSet.SUBWAY.getRedisSaver());

        transportPathResults.addAll(pathsList);
        transportPathResults.addAll(
            generatedPaths(pathCandidates, busPathData, RedisSaveSet.DEFAULT.getRedisSaver()));
        return transportPathResults;
    }

    private List<PathCandidate> extractedUncachedResults(List<PathCandidate> pathCandidates,
        List<Paths> transportPathResults) {
        return pathCandidates.parallelStream()
            .filter(pathCandidate -> {
                Optional<TransportCache> optionalPathResult = findBySubwayId(
                    pathCandidate);
                return isValidTransportCache(transportPathResults, pathCandidate,
                    optionalPathResult);
            }).collect(Collectors.toList());
    }

    private boolean isValidTransportCache(List<Paths> transportPathResults,
        PathCandidate pathCandidate,
        Optional<TransportCache> optionalPathResult) {
        if (optionalPathResult.isPresent()) {
            insertTransportPathResult(transportPathResults, pathCandidate,
                optionalPathResult.get());
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

    private String redisId(APIUtilityDocument apiUtilityDocument, Point targetPoint) {
        return "subway:" + new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY())
            + targetPoint;
    }

    private void insertTransportPathResult(List<Paths> transportPathResults,
        PathCandidate pathCandidate,
        TransportCache optionalPathResult) {
        Paths paths = optionalPathResult.getPaths();

        Point startPoint = pathCandidate.getUserPoint();
        Point endPoint = pathCandidate.getDestination().getPoint();
        CalibratedWalkPath calibratedWalkPath = CalibratedWalkPath
            .valueOf(paths, startPoint, endPoint);
        transportPathResults.add(calibratedWalkPath.getPaths());
    }

    private List<Paths> generatedPaths(List<PathCandidate> pathCandidates, Map<PathCandidate,
        APITransportResponse> transportPathDates, RedisSaver redissaver) {
        Deque<PathCandidate> pathCandidateQueue = new ArrayDeque<>(pathCandidates);
        List<Paths> pathsList = new ArrayList<>();

        while (!pathCandidateQueue.isEmpty()) {
            PathCandidate pathCandidate = pathCandidateQueue.pollFirst();
            APITransportResponse transportResponse = transportPathDates.get(pathCandidate);
            long startTime = System.currentTimeMillis();
            if (Objects.isNull(transportResponse)) {
                if (System.currentTimeMillis() - startTime <= LIMIT_TIME) {
                    pathCandidateQueue.addLast(pathCandidate);
                }
                continue;
            }
            Point startPoint = pathCandidate.getUserPoint();
            Point endPoint = pathCandidate.getDestination().getPoint();
            PathsResponse pathsResponse = PathsResponse.valueOf(
                Objects.requireNonNull(transportResponse).getMsgBody());
            Paths paths = pathsResponse.toPaths(startPoint, endPoint);

            redissaver.save(pathCandidate, transportRedisRepository, paths);
            CalibratedWalkPath calibratedWalkPath = CalibratedWalkPath
                .valueOf(paths, startPoint, endPoint);
            pathsList.add(calibratedWalkPath.getPaths());
        }
        return pathsList;
    }
}
