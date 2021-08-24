package seeuthere.goodday.location.domain.requester;

import java.util.List;
import java.util.Objects;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class SearchRequester {

    private static final String BASIC_URL = "/v2/local/search/keyword.json";
    private final WebClient webClient;

    public SearchRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<APIUtilityDocument> requestSearch(String keyword) {
        try {
            APIUtilityResponse apiUtilityResponse = receivedSearchResponse(keyword);
            return Objects.requireNonNull(apiUtilityResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private APIUtilityResponse receivedSearchResponse(String keyword) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(BASIC_URL)
                    .queryParam("query", keyword)
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToFlux(APIUtilityResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(LocationExceptionSet.KAKAO_SERVER));
    }
}
