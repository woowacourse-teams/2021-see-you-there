package seeuthere.goodday.location.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import seeuthere.goodday.location.config.Requesters;
import seeuthere.goodday.location.domain.algorithm.DuplicateStationRemover;
import seeuthere.goodday.location.domain.algorithm.PathResult;
import seeuthere.goodday.location.domain.algorithm.StationGrades;
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
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.LocationResponse;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.response.SpecificLocationResponse;
import seeuthere.goodday.location.dto.response.UtilityResponse;
import seeuthere.goodday.location.repository.PathResultRedisRepository;
import seeuthere.goodday.location.util.LocationCategory;
import seeuthere.goodday.path.domain.PointWithName;
import seeuthere.goodday.path.service.PathService;

@Service
public class LocationService {

    private final Requesters requesters;
    private final PathService pathService;
    private final PathResultRedisRepository pathResultRedisRepository;
    private final WeightStations weightStations;

    public LocationService(
        Requesters requesters,
        PathService pathService, PathResultRedisRepository pathResultRedisRepository,
        WeightStations weightStations) {
        this.requesters = requesters;
        this.pathService = pathService;
        this.pathResultRedisRepository = pathResultRedisRepository;
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
        // 후보 역들 리스트
        List<UtilityResponse> candidateDestinations = middleUtilityResponses(userStartPoints);

        Map<Point, Map<Point, PathResult>> responsesFromPoint = makePath(userStartPoints, candidateDestinations);
        StationGrades stationGrades = StationGrades.valueOf(userStartPoints, candidateDestinations, responsesFromPoint);

        UtilityResponse finalResponse = stationGrades.finalUtilityResponse();
        return new MiddlePointResponse(finalResponse.getX(), finalResponse.getY());
    }

    private List<UtilityResponse> middleUtilityResponses(Points points) {
        MiddlePoint userMiddlePoint = MiddlePoint.valueOf(points);
        List<UtilityResponse> candidateDestinations = findSubway(userMiddlePoint.getX(), userMiddlePoint.getY());
        Set<String> keys = weightStations.getKeys();
        for (String key : keys) {
            insertWeight(candidateDestinations, key);
        }

        DuplicateStationRemover duplicateStationRemover = new DuplicateStationRemover(
            candidateDestinations);
        return duplicateStationRemover.result();
    }

    private void insertWeight(List<UtilityResponse> candidateDestinations, String key) {
        Point point = weightStations.get(key);
        UtilityResponse weightedStationResponse = new UtilityResponse.Builder()
            .placeName(key)
            .x(point.getX())
            .y(point.getY())
            .build();
        candidateDestinations.add(weightedStationResponse);
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

        List<PathTransferResult> pathResults = searchAndCachePath(new Points(unCalculatePoints), target,
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

    private List<PathTransferResult> searchAndCachePath(Points sourcePoints, Point target, String placeName) {
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
