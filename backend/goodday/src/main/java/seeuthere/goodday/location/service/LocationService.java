package seeuthere.goodday.location.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.CoordinateRequester;
import seeuthere.goodday.location.domain.LocationRequester;
import seeuthere.goodday.location.domain.SearchRequester;
import seeuthere.goodday.location.domain.UtilityRequester;
import seeuthere.goodday.location.dto.AxisDocument;
import seeuthere.goodday.location.dto.Document;
import seeuthere.goodday.location.dto.UtilityDocument;
import seeuthere.goodday.location.util.LocationCategory;

@Service
public class LocationService {

    private final WebClient webClient;

    public LocationService(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<Document> findAddress(double x, double y) {

        LocationRequester locationRequester = new LocationRequester(webClient);
        return locationRequester.requestAddress(x, y);
    }

    public List<AxisDocument> findAxis(String address) {

        CoordinateRequester coordinateRequester = new CoordinateRequester(webClient);
        return coordinateRequester.requestCoordinate(address);
    }

    public List<UtilityDocument> findUtility(String category, double x, double y) {

        String categoryCode = LocationCategory.translatedCode(category);
        UtilityRequester utilityRequester = new UtilityRequester(webClient);
        return utilityRequester.requestUtility(categoryCode, x, y);
    }

    public List<UtilityDocument> findSearch(String keyword) {

        SearchRequester searchRequester = new SearchRequester(webClient);
        return searchRequester.requestSearch(keyword);
    }
}
