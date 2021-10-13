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
import seeuthere.goodday.location.domain.algorithm.PathResult;
import seeuthere.goodday.location.temp.PathData;
import seeuthere.goodday.location.temp.StationPoint;
import seeuthere.goodday.location.domain.combiner.AxisKeywordCombiner;
import seeuthere.goodday.location.domain.location.MiddlePoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.domain.location.WeightStations;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.dto.PathTransferResult;
import seeuthere.goodday.location.dto.api.response.APIAxisDocument;
import seeuthere.goodday.location.dto.api.response.APILocationDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.LocationResponse;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.response.SpecificLocationResponse;
import seeuthere.goodday.location.dto.response.UtilityResponse;
import seeuthere.goodday.location.repository.PathResultRedisRepository;
import seeuthere.goodday.location.temp.Temp;
import seeuthere.goodday.location.util.LocationCategory;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.PointWithName;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.repository.SubwayRedisRepository;
import seeuthere.goodday.path.service.PathService;

@Service
public class LocationService {

    private final Requesters requesters;
    private final PathService pathService;
    private final PathResultRedisRepository pathResultRedisRepository;
    private final SubwayRedisRepository subwayRedisRepository;
    private final WeightStations weightStations;

    public LocationService(Requesters requesters,
        PathService pathService,
        PathResultRedisRepository pathResultRedisRepository,
        SubwayRedisRepository subwayRedisRepository,
        WeightStations weightStations) {
        this.requesters = requesters;
        this.pathService = pathService;
        this.pathResultRedisRepository = pathResultRedisRepository;
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
        List<PathsResponse> redisSubwayResults = new ArrayList<>();
        List<PathsResponse> busResults = new ArrayList<>();
        List<Temp> uncachedResults = new ArrayList<>();

        for (Temp temp : temps) {
            // 레디스에서 데이터 가져오기
            Optional<TransportCache> optionalPathResult = subwayRedisRepository.findById(
                "subway:" + temp.getUserNearStation().block() + temp.getDestination().getPoint());
            if (optionalPathResult.isPresent()) {
                APITransportResponse apiTransportResponse = optionalPathResult.get()
                    .getApiTransportResponse();
                PathsResponse pathsResponse = PathsResponse
                    .valueOf(apiTransportResponse.getMsgBody());

                // pathWithWalk
                Paths paths = pathsResponse.toPaths();
                PointWithName startPointWithName = new PointWithName(temp.getUserPoint(), "출발점");
                PointWithName endPointWithName = new PointWithName(temp.getDestination().getPoint(), "도착점");
                Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
                walkWithPaths.sort();

                redisSubwayResults.add(PathsResponse.valueOf(walkWithPaths));
                continue;
            }
            uncachedResults.add(temp);
        }

        // 지하철 남은거 가져오기
        List<PathData> subWayPathData = pathService.findSubwayPaths(uncachedResults);

        // 버스 전체 조회하기
        List<PathData> busPathData = pathService.findBusPaths(temps);

        // -> subway 를 PathResult 로 편집해서 redis에 저장하기
        for (PathData pathData : subWayPathData) {
            APITransportResponse transportResponse = pathData.getTransportResponseMono().block();
            Temp temp = pathData.getTemp();

            // 여기에서 캐싱해야함
            TransportCache transportCache = new TransportCache(
                "subway" + temp.getUserNearStation().block() + temp.getDestination().getPoint(),
                transportResponse);
            subwayRedisRepository.save(transportCache);

            // redisSubwayResults 에 합치기
            PathsResponse pathsResponse = PathsResponse.valueOf(
                Objects.requireNonNull(transportResponse).getMsgBody());
            Paths paths = pathsResponse.toPaths();
            PointWithName startPointWithName = new PointWithName(temp.getUserPoint(), "출발점");
            PointWithName endPointWithName = new PointWithName(temp.getDestination().getPoint(), "도착점");
            Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
            walkWithPaths.sort();
            redisSubwayResults.add(PathsResponse.valueOf(walkWithPaths));
        }

        // 버스 편집하기
        for (PathData pathData : busPathData) {
            APITransportResponse transportResponse = pathData.getTransportResponseMono().block();
            Temp temp = pathData.getTemp();

            PathsResponse pathsResponse = PathsResponse.valueOf(
                Objects.requireNonNull(transportResponse).getMsgBody());
            Paths paths = pathsResponse.toPaths();
            PointWithName startPointWithName = new PointWithName(temp.getUserPoint(), "출발점");
            PointWithName endPointWithName = new PointWithName(temp.getDestination().getPoint(), "도착점");
            Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
            walkWithPaths.sort();

            busResults.add(PathsResponse.valueOf(walkWithPaths));

        }

        // 도착점이 같은 지하철과 버스 묶기

        // 출발점이 같은 친구중에 비용이 적은 친구 선택하기

        // 비용 계산하기

        // 정렬해서 제일 작은 친구 반환하기


//        Map<Point, Map<Point, PathResult>> responsesFromPoint = makePath(userStartPoints, candidateDestinations);
//        StationGrades stationGrades = StationGrades.valueOf(userStartPoints, candidateDestinations, responsesFromPoint);
//
//        UtilityResponse finalResponse = stationGrades.finalUtilityResponse();
//        return new MiddlePointResponse(finalResponse.getX(), finalResponse.getY());
        return null;
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

    private Map<Point, Map<Point, PathResult>> makePath(Points points,
        List<UtilityResponse> utilityResponses) {
        Map<Point, Map<Point, PathResult>> responsesFromPoint = new HashMap<>();

        // 여기까지 개선하기
        for (UtilityResponse response : utilityResponses) {
            calculateSource(points, responsesFromPoint, response);
        }
        return responsesFromPoint;
    }

    private void calculateSource(Points points,
        Map<Point, Map<Point, PathResult>> responsesFromPoint, UtilityResponse response) {

        final Point target = new Point(response.getX(), response.getY());

        // redis 에서 있는 친구들 분리

        // 남은 친구들 webClient 요청

        // redis 저장

        // 반환
        String placeName = response.getPlaceName();
        List<PathTransferResult> pathTransferResults = calculatedPathTransferResults(points,
            placeName, target);

        for (PathTransferResult pathTransferResult : pathTransferResults) {
            Map<Point, PathResult> responses
                = responsesFromPoint.getOrDefault(pathTransferResult.getSource(), new HashMap<>());
            responses.put(pathTransferResult.getTarget(), pathTransferResult.getPathResult());
            responsesFromPoint.put(pathTransferResult.getSource(), responses);
        }
    }

    private List<PathTransferResult> calculatedPathTransferResults(Points points,
        String placeName, Point target) {
        // redis에 담긴 친구들
        List<PathTransferResult> redisResults = new ArrayList<>();
        // redis에 없는 친구들
        List<Point> unCalculatePoints = points.getPointRegistry().stream()
            .filter(source -> {
                Optional<PathResult> pathResult = pathResultRedisRepository
                    .findById(source.toString() + target);
                if (pathResult.isPresent()) {
                    redisResults.add(new PathTransferResult(source, target, pathResult.get()));
                    return false;
                }
                return true;
            }).collect(Collectors.toList());

        List<PathTransferResult> pathResults = searchAndCachePath(new Points(unCalculatePoints),
            target,
            placeName);
        // point를 전부 보내서 결과를 한꺼번에 가져온다. - searchPath [v]
        // 버스랑, 지하철 2개 가져와야 한다. - searchPath 내에서 bus & subway 따로 처리
        // 버스 몽땅, 지하철 몽땅 가져오는건데
        // 같은 친구를 찾아서 매핑 - bus출발&도착 - subway출발&도착 같은 것 끼리 비교해 짧은 거 가져와 collect
        // redis에 save

        return points.getPointRegistry().parallelStream()
            .map(source -> new PathTransferResult(
                source,
                target,
                pathResultRedisRepository.findById(source.toString() + target)
                    .orElseGet(
                        () -> cachePathResult(source, target, placeName)))
            )
            .collect(Collectors.toList());
    }

    private List<PathTransferResult> searchAndCachePath(Points sourcePoints, Point target,
        String placeName) {
        return sourcePoints.getPointRegistry().stream()
            .map(source -> {
                PathResult result = minPathResult(source, target, placeName);
                pathResultRedisRepository.save(result);
                return new PathTransferResult(source, target, result);
            }).collect(Collectors.toList());
    }

    private PathResult cachePathResult(Point source, Point target, String placeName) {
        PathResult result = minPathResult(source, target, placeName);
        pathResultRedisRepository.save(result);
        return result;
    }

    private PathResult minPathResult(Point source, Point target, String placeName) {
        PointWithName startPointWithName = new PointWithName(source, "출발점");
        PointWithName endPointWithName = new PointWithName(target, "도착점");

        PathResult subwayResult = PathResult
            .pathsResponseToPathResult(source, target,
                pathService.findSubwayPath(startPointWithName, endPointWithName),
                weightStations.contains(placeName));

        PathResult busSubwayResult = PathResult
            .pathsResponseToPathResult(source, target,
                pathService.findTransferPath(startPointWithName, endPointWithName),
                weightStations.contains(placeName));

        return PathResult.minTimePathResult(subwayResult, busSubwayResult);
    }

    private List<UtilityResponse> findSubway(double x, double y) {
        List<APIUtilityDocument> apiUtilityDocuments = requesters.utility().requestSubway(x, y);
        return toUtilityResponse(apiUtilityDocuments);
    }
}
