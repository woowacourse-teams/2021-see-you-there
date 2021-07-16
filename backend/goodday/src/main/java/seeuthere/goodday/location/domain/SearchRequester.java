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

public class SearchRequester {

    private static final String BASIC_URL = "/v2/local/search/keyword.json";
    private final WebClient webClient;

    public SearchRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<UtilityDocument> requestSearch(String keyword) {
        try {
            UtilityResponse utilityResponse = receivedSearchResponse(keyword);
            return Objects.requireNonNull(utilityResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private UtilityResponse receivedSearchResponse(String keyword) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(BASIC_URL)
                    .queryParam("query", keyword)
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(UtilityResponse.class)
            .block();
    }
}
