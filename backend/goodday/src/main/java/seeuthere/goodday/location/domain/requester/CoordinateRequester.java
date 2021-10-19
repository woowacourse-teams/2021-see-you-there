package seeuthere.goodday.location.domain.requester;

import java.util.List;
import java.util.Objects;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.api.response.APIAxisDocument;
import seeuthere.goodday.location.dto.api.response.APIAxisResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class CoordinateRequester {

    private static final String BASIC_URL = "/v2/local/search/address.json";
    private final WebClient webClient;

    public CoordinateRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<APIAxisDocument> requestCoordinate(String address) {
        try {
            APIAxisResponse APIAxisResponse = receivedAxisResponse(address);
            return Objects.requireNonNull(APIAxisResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private APIAxisResponse receivedAxisResponse(String address) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(BASIC_URL)
                    .queryParam("query", address)
                    .build())
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToFlux(APIAxisResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(LocationExceptionSet.KAKAO_SERVER));
    }
}
