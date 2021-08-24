package seeuthere.goodday.location.domain.requester;

import java.util.List;
import java.util.Objects;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.api.response.APILocationDocument;
import seeuthere.goodday.location.dto.api.response.APILocationResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class LocationRequester {

    private static final String BASIC_URL = "/v2/local/geo/coord2regioncode.json";
    private final WebClient webClient;

    public LocationRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<APILocationDocument> requestAddress(double x, double y) {
        try {
            APILocationResponse APILocationResponse = receivedLocationResponse(x, y);

            return Objects.requireNonNull(APILocationResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private APILocationResponse receivedLocationResponse(double x, double y) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(BASIC_URL)
                    .queryParam("x", x)
                    .queryParam("y", y)
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToFlux(APILocationResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(LocationExceptionSet.KAKAO_SERVER));
    }
}
