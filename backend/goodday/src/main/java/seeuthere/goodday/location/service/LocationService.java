package seeuthere.goodday.location.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.combiner.AxisKeywordCombiner;
import seeuthere.goodday.location.domain.location.MiddlePoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.requester.LocationRequester;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.domain.requester.UtilityRequester;
import seeuthere.goodday.location.dto.api.response.APIAxisDocument;
import seeuthere.goodday.location.dto.api.response.APILocationDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.request.LocationRequest;
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.LocationResponse;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.response.SpecificLocationResponse;
import seeuthere.goodday.location.dto.response.UtilityResponse;
import seeuthere.goodday.location.util.LocationCategory;

@Service
public class LocationService {

    private final WebClient webClient;

    public LocationService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<SpecificLocationResponse> findAddress(double x, double y) {
        LocationRequester locationRequester = new LocationRequester(webClient);
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
        CoordinateRequester coordinateRequester = new CoordinateRequester(webClient);
        SearchRequester searchRequester = new SearchRequester(webClient);

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
        UtilityRequester utilityRequester = new UtilityRequester(webClient);
        List<APIUtilityDocument> apiUtilityDocuments = utilityRequester
            .requestUtility(categoryCode, x, y);
        return toUtilityResponse(apiUtilityDocuments);
    }

    public List<UtilityResponse> findSearch(String keyword) {
        SearchRequester searchRequester = new SearchRequester(webClient);
        List<APIUtilityDocument> apiUtilityDocuments = searchRequester.requestSearch(keyword);
        return toUtilityResponse(apiUtilityDocuments);
    }

    private List<UtilityResponse> toUtilityResponse(List<APIUtilityDocument> apiUtilityDocuments) {
        return apiUtilityDocuments.stream()
            .map(UtilityResponse::new)
            .collect(Collectors.toList());
    }

    public MiddlePointResponse findMiddlePoint(LocationsRequest locationsRequest) {
        List<Point> points = new ArrayList<>();

        for (LocationRequest locationRequest : locationsRequest.getLocationRequests()) {
            points.add(new Point(locationRequest.getX(), locationRequest.getY()));
        }

        MiddlePoint middlePoint = MiddlePoint.valueOf(points);
        return new MiddlePointResponse(middlePoint.getX(), middlePoint.getY());
    }
}
