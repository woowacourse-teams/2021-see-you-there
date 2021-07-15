package seeuthere.goodday.location.domain;

import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.AxisDocument;
import seeuthere.goodday.location.dto.AxisResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

import java.util.List;
import java.util.Objects;

public class CoordinateRequester {

    private static final String BASIC_URL = "/v2/local/search/address.json";
    private final WebClient webClient;

    public CoordinateRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<AxisDocument> requestCoordinate(String address) {
        try {
            AxisResponse axisResponse = receivedAxisResponse(address);
            return Objects.requireNonNull(axisResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private AxisResponse receivedAxisResponse(String address) {
        return webClient.get()
                .uri(uriBuilder ->
                        uriBuilder.path(BASIC_URL)
                                .queryParam("query", address)
                                .build())
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(AxisResponse.class)
                .block();
    }
}
