package seeuthere.goodday.location.domain;

import java.util.List;
import java.util.Objects;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.Document;
import seeuthere.goodday.location.dto.LocationResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class LocationRequester {

    private static final String BASIC_URL = "/v2/local/geo/coord2regioncode.json?x=%s&y=%s";
    private final WebClient webClient;

    public LocationRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<Document> requestAddress(double x, double y){
        try {
            String url = String.format(BASIC_URL, x, y);
            LocationResponse locationResponse = webClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(LocationResponse.class)
                .block();

            return Objects.requireNonNull(locationResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }
}