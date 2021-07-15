package seeuthere.goodday.location.domain;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.Document;
import seeuthere.goodday.location.dto.LocationResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

import java.util.List;
import java.util.Objects;

public class LocationRequester {

    private static final String BASIC_URL = "/v2/local/geo/coord2regioncode.json";
    private final WebClient webClient;

    public LocationRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<Document> requestAddress(double x, double y) {
        try {
            LocationResponse locationResponse = receivedLocationResponse(x, y);

            return Objects.requireNonNull(locationResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private LocationResponse receivedLocationResponse(double x, double y) {
        return webClient.get()
                .uri(uriBuilder ->
                        uriBuilder.path(BASIC_URL)
                                .queryParam("x", x)
                                .queryParam("y", y)
                                .build()
                )
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(LocationResponse.class)
                .block();
    }
}
