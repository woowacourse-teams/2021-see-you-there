package seeuthere.goodday.location.service;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.CoordinateRequester;
import seeuthere.goodday.location.domain.LocationRequester;
import seeuthere.goodday.location.dto.AxisDocument;
import seeuthere.goodday.location.dto.Document;

import java.util.List;

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
}
