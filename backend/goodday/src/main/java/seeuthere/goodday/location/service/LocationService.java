package seeuthere.goodday.location.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.combiner.AxisKeywordCombiner;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.location.Location;
import seeuthere.goodday.location.domain.requester.LocationRequester;
import seeuthere.goodday.location.domain.location.MiddlePoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.domain.requester.UtilityRequester;
import seeuthere.goodday.location.dto.api.response.APIAxisDocument;
import seeuthere.goodday.location.dto.api.response.APILocationDocument;
import seeuthere.goodday.location.dto.request.LocationRequest;
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.util.LocationCategory;

@Service
public class LocationService {

    private final WebClient webClient;

    public LocationService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<APILocationDocument> findAddress(double x, double y) {

        LocationRequester locationRequester = new LocationRequester(webClient);
        return locationRequester.requestAddress(x, y);
    }

    public List<Location> findAxis(String address) {
        CoordinateRequester coordinateRequester = new CoordinateRequester(webClient);
        SearchRequester searchRequester = new SearchRequester(webClient);

        List<APIAxisDocument> exactAddressResult = coordinateRequester.requestCoordinate(address);
        List<APIUtilityDocument> keyWordResult = searchRequester.requestSearch(address);

        AxisKeywordCombiner axisKeywordCombiner = AxisKeywordCombiner.valueOf(exactAddressResult,
            keyWordResult);
        return axisKeywordCombiner.getLocations();
    }

    public List<APIUtilityDocument> findUtility(String category, double x, double y) {

        String categoryCode = LocationCategory.translatedCode(category);
        UtilityRequester utilityRequester = new UtilityRequester(webClient);
        return utilityRequester.requestUtility(categoryCode, x, y);
    }

    public List<APIUtilityDocument> findSearch(String keyword) {
        SearchRequester searchRequester = new SearchRequester(webClient);
        return searchRequester.requestSearch(keyword);
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
