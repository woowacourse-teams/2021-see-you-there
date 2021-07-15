package seeuthere.goodday.location.domain;

import java.util.List;
import java.util.Objects;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.UtilityDocument;
import seeuthere.goodday.location.dto.UtilityResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class UtilityRequester {

    private static final String BASIC_URL = "/v2/local/search/category.json";
    private static final int BASIC_DISTANCE = 1000;
    private final WebClient webClient;

    public UtilityRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<UtilityDocument> requestUtility(String categoryCode, double x, double y) {
        try {
            UtilityResponse utilityResponse = receivedUtilityResponse(categoryCode, x, y);
            return Objects.requireNonNull(utilityResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private UtilityResponse receivedUtilityResponse(String categoryCode, double x, double y) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(BASIC_URL)
                    .queryParam("x", x)
                    .queryParam("y", y)
                    .queryParam("category_group_code", categoryCode)
                    .queryParam("radius", BASIC_DISTANCE)
                    .queryParam("sort", "distance")
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(UtilityResponse.class)
            .block();
    }
}
