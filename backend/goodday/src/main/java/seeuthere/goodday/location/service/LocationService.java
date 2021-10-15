package seeuthere.goodday.location.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.Set;
import java.util.Vector;
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
import seeuthere.goodday.location.temp.PathData;
import seeuthere.goodday.location.temp.StationPoint;
import seeuthere.goodday.location.temp.Temp;
import seeuthere.goodday.location.util.LocationCategory;
import seeuthere.goodday.path.domain.Path;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.PointWithName;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsRedisDto;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.repository.SubwayRedisRepository;
import seeuthere.goodday.path.service.PathService;

@Service
public class LocationService {

    private final Requesters requesters;
    private final PathService pathService;
    private final SubwayRedisRepository subwayRedisRepository;
    private final WeightStations weightStations;

    public LocationService(Requesters requesters,
        PathService pathService,
        SubwayRedisRepository subwayRedisRepository,
        WeightStations weightStations) {
        this.requesters = requesters;
        this.pathService = pathService;
        this.subwayRedisRepository = subwayRedisRepository;
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
        // 모든 유저의 위치 정보
        Points userStartPoints = Points.valueOf(locationsRequest);

        // 유저 근처의 역들을 찾아서 가져오기
        Map<Point, Mono<APIUtilityResponse>> nearbyStations = requesters.utility()
            .findNearbyStations(userStartPoints);

        // 후보 역들 리스트
        List<StationPoint> candidateDestinations = findMiddleStations(userStartPoints);

        // 경우의 수찾기
        // todo - 클래스명 바꾸기
        List<Temp> temps = allCrossCase(userStartPoints, candidateDestinations, nearbyStations);

        // 지하철 캐싱된 데이터 찾기
        List<Paths> redisSubwayResults = new ArrayList<>();

        List<Temp> uncachedResults = temps.parallelStream()
            .filter(temp -> {
                APIUtilityDocument apiUtilityDocument = Objects.requireNonNull(
                    temp.getUserNearStation().block()).getDocuments().get(0);
                Point targetPoint = temp.getDestination().getPoint();
                Optional<TransportCache> optionalPathResult = subwayRedisRepository.findById(
                    "subway:" + new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY()) + targetPoint);
                if (optionalPathResult.isPresent()) {
                    Paths paths = optionalPathResult.get().getPaths();

                    // pathWithWalk
                    Point startPoint = temp.getUserPoint();
                    Point endPoint = temp.getDestination().getPoint();
                    PointWithName startPointWithName = new PointWithName(startPoint, "출발점");
                    PointWithName endPointWithName = new PointWithName(endPoint, "도착점");
                    Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
                    walkWithPaths.sort();

                    redisSubwayResults.add(walkWithPaths);
                    return false;
                }
                return true;
            }).collect(Collectors.toList());

        // 지하철 남은거 가져오기
        List<PathData> subWayPathData = pathService.findSubwayPaths(uncachedResults);

        // 버스 전체 조회하기
        List<PathData> busPathData = pathService.findBusPaths(temps);

        List<Paths> pathsList = subWayPathData.parallelStream()
            .map(pathData -> {
                APITransportResponse transportResponse = pathData.getTransportResponseMono()
                    .block();
                Temp temp = pathData.getTemp();

                PathsResponse pathsResponse = PathsResponse.valueOf(
                    Objects.requireNonNull(transportResponse).getMsgBody());
                Point startPoint = temp.getUserPoint();
                Point endPoint = temp.getDestination().getPoint();
                Paths paths = pathsResponse.toPaths(startPoint, endPoint);
                // 여기에서 캐싱해야함
                APIUtilityDocument apiUtilityDocument = Objects
                    .requireNonNull(temp.getUserNearStation().block()).getDocuments()
                    .get(0);
                TransportCache transportCache = new TransportCache(
                    "subway:" + new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY())
                        + temp.getDestination().getPoint(),
                    new PathsRedisDto(paths));
                subwayRedisRepository.save(transportCache);

                // redisSubwayResults 에 합치기
                PointWithName startPointWithName = new PointWithName(startPoint, "출발점");
                PointWithName endPointWithName = new PointWithName(endPoint, "도착점");
                Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
                walkWithPaths.sort();
                return walkWithPaths;
            })
            .collect(Collectors.toList());
        redisSubwayResults.addAll(pathsList);

        List<Paths> busResults = busPathData.parallelStream()
            .map(pathData -> {
                APITransportResponse transportResponse = pathData.getTransportResponseMono()
                    .block();
                Temp temp = pathData.getTemp();

                PathsResponse pathsResponse = PathsResponse.valueOf(
                    Objects.requireNonNull(transportResponse).getMsgBody());
                Point startPoint = temp.getUserPoint();
                Point endPoint = temp.getDestination().getPoint();
                Paths paths = pathsResponse.toPaths(startPoint, endPoint);
                PointWithName startPointWithName = new PointWithName(startPoint, "출발점");
                PointWithName endPointWithName = new PointWithName(endPoint, "도착점");
                Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
                walkWithPaths.sort();
                return walkWithPaths;
            })
            .collect(Collectors.toList());

        Map<Point, Map<Point, Path>> pathFromSourceToTarget = new HashMap<>();
        for (Paths paths : redisSubwayResults) {
            Path path = paths.getPathRegistry().get(0);
            Point startPoint = paths.getStartPoint();
            Point endPoint = paths.getEndPoint();
            Map<Point, Path> pointKeyValuePath = pathFromSourceToTarget
                .getOrDefault(endPoint, new HashMap<>());
            pointKeyValuePath.put(startPoint, path);
            pathFromSourceToTarget.put(endPoint, pointKeyValuePath);
        }

        for (Paths paths : busResults) {
            Path path = paths.getPathRegistry().get(0);
            Point startPoint = paths.getStartPoint();
            Point endPoint = paths.getEndPoint();

            Map<Point, Path> pointKeyValuePath = pathFromSourceToTarget
                .getOrDefault(endPoint, new HashMap<>());
            if (pointKeyValuePath.containsKey(startPoint)) {
                // 여기서 크기 비교하기
                Path minPath = minPath(path, pointKeyValuePath.get(startPoint));
                pointKeyValuePath.put(startPoint, minPath);
            } else {
                pointKeyValuePath.put(startPoint, path);
            }
            pathFromSourceToTarget.put(endPoint, pointKeyValuePath);
        }
        // 비용 계산하기
        StationGrades stationGrades = StationGrades.valueOf(userStartPoints, candidateDestinations, pathFromSourceToTarget);

        // 정렬해서 제일 작은 친구 반환하기
        StationPoint terminalStationPoint = stationGrades.findStationPoint();
        Point terminalPoint = terminalStationPoint.getPoint();

        return new MiddlePointResponse(terminalPoint.getX(), terminalPoint.getY());
    }

    private Path minPath(Path busPath, Path subwayPath) {
        if (busPath.getTime() < subwayPath.getTime()) {
            return busPath;
        }
        return subwayPath;
    }

    private List<Temp> allCrossCase(Points userStartPoints, List<StationPoint> candidateDestinations,
        Map<Point, Mono<APIUtilityResponse>> nearbyStations) {
        List<Temp> temps = new ArrayList<>();
        for (Point startPoint : userStartPoints.getPointRegistry()) {
            for (StationPoint stationPoint : candidateDestinations) {
                temps.add(new Temp(startPoint, nearbyStations.get(startPoint), stationPoint));
            }
        }
        return temps;
    }

    private List<StationPoint> findMiddleStations(Points points) {
        MiddlePoint userMiddlePoint = MiddlePoint.valueOf(points);
        List<StationPoint> stationPoints = new ArrayList<>();

        for (UtilityResponse utilityResponse : findSubway(userMiddlePoint.getX(),
            userMiddlePoint.getY())) {
            stationPoints.add(new StationPoint(utilityResponse.getPlaceName(), utilityResponse.getX(),
                utilityResponse.getY()));
        }

        Set<String> keys = weightStations.getKeys();
        for (String key : keys) {
            insertWeight(stationPoints, key);
        }

        DuplicateStationRemover duplicateStationRemover = new DuplicateStationRemover(stationPoints);
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
