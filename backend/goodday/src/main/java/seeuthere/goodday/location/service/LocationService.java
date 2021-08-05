package seeuthere.goodday.location.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import seeuthere.goodday.location.domain.algorithm.PathResult;
import seeuthere.goodday.location.domain.algorithm.StationGrades;
import seeuthere.goodday.location.domain.combiner.AxisKeywordCombiner;
import seeuthere.goodday.location.domain.location.MiddlePoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.requester.LocationRequester;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.domain.requester.UtilityRequester;
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
import seeuthere.goodday.path.service.PathService;

@Service
public class LocationService {

    private final CoordinateRequester coordinateRequester;
    private final LocationRequester locationRequester;
    private final SearchRequester searchRequester;
    private final UtilityRequester utilityRequester;
    private final PathService pathService;
    private final PathResultRedisRepository pathResultRedisRepository;

    public LocationService(CoordinateRequester coordinateRequester,
        LocationRequester locationRequester, SearchRequester searchRequester,
        UtilityRequester utilityRequester, PathService pathService,
        PathResultRedisRepository pathResultRedisRepository) {
        this.coordinateRequester = coordinateRequester;
        this.locationRequester = locationRequester;
        this.searchRequester = searchRequester;
        this.utilityRequester = utilityRequester;
        this.pathService = pathService;
        this.pathResultRedisRepository = pathResultRedisRepository;
    }

    public List<SpecificLocationResponse> findAddress(double x, double y) {
        List<APILocationDocument> apiLocationDocuments = locationRequester.requestAddress(x, y);

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
            address, coordinateRequester, searchRequester);

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
        List<APIUtilityDocument> apiUtilityDocuments = utilityRequester
            .requestUtility(categoryCode, x, y);
        return toUtilityResponse(apiUtilityDocuments);
    }

    public List<UtilityResponse> findSearch(String keyword) {
        List<APIUtilityDocument> apiUtilityDocuments = searchRequester.requestSearch(keyword);
        return toUtilityResponse(apiUtilityDocuments);
    }

    private List<UtilityResponse> toUtilityResponse(List<APIUtilityDocument> apiUtilityDocuments) {
        return apiUtilityDocuments.stream()
            .map(UtilityResponse::new)
            .collect(Collectors.toList());
    }

    public MiddlePointResponse findMiddlePoint(LocationsRequest locationsRequest) {
        Points points = Points.valueOf(locationsRequest);
        MiddlePoint middlePoint = MiddlePoint.valueOf(points);

        List<UtilityResponse> utilityResponses = findUtility(LocationCategory.SW8.getDescription(),
            middlePoint.getX(), middlePoint.getY());

        Map<Point, Map<Point, PathResult>> responsesFromPoint
            = getPointsToPath(points, utilityResponses);

        StationGrades stationGrades
            = StationGrades.valueOf(points, utilityResponses, responsesFromPoint);

        UtilityResponse finalResponse = stationGrades.finalUtilityResponse();
        return new MiddlePointResponse(finalResponse.getX(), finalResponse.getY());
    }

    private Map<Point, Map<Point, PathResult>> getPointsToPath(Points points,
        List<UtilityResponse> utilityResponses) {
        Map<Point, Map<Point, PathResult>> responsesFromPoint = new HashMap<>();

        for (UtilityResponse response : utilityResponses) {
            calculateSource2(points, responsesFromPoint, response);
        }
        return responsesFromPoint;
    }

    private void calculateSource2(Points points,
        Map<Point, Map<Point, PathResult>> responsesFromPoint, UtilityResponse response) {
        for (Point source : points.getPoints()) {
            Map<Point, PathResult> responses
                = responsesFromPoint.getOrDefault(source, new HashMap<>());
            Point target = new Point(response.getX(), response.getY());

            PathResult pathResult = pathResultRedisRepository
                .findById(source.toString() + target)
                .orElse(abc(source, target));

//            PathResult pathResult = pathResultRedisRepository
//                .findById(source.toString() + target.toString())
//                .get();

            responses.put(target,pathResult);
            responsesFromPoint.put(source, responses);
        }
    }

    private PathResult abc(Point source, Point target) {
        PathResult result = PathResult
            .pathsResponseToPathResult(source, target,
                pathService.findSubwayPath(source, target));
        pathResultRedisRepository.save(result);
        Optional<PathResult> byId = pathResultRedisRepository
            .findById(source.toString() + target.toString());
        PathResult pathResult = byId.get();
        return result;
    }
}
