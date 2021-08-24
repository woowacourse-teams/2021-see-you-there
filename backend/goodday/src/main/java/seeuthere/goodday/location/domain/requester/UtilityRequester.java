package seeuthere.goodday.location.domain.requester;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;
import seeuthere.goodday.location.exception.LocationExceptionSet;
import seeuthere.goodday.location.util.LocationCategory;

public class UtilityRequester {

    private static final String BASIC_URL = "/v2/local/search/category.json";
    private static final int BASIC_DISTANCE = 5000;
    private final WebClient webClient;

    public UtilityRequester(WebClient webClient) {
        this.webClient = webClient;
    }

    public List<APIUtilityDocument> requestUtility(String categoryCode, double x, double y) {
        try {
            APIUtilityResponse apiUtilityResponse = receivedUtilityResponse(categoryCode, x, y, 1);
            return Objects.requireNonNull(apiUtilityResponse).getDocuments();
        } catch (WebClientResponseException e) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private APIUtilityResponse receivedUtilityResponse(String categoryCode, double x, double y,
        int page) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(BASIC_URL)
                    .queryParam("x", x)
                    .queryParam("y", y)
                    .queryParam("category_group_code", categoryCode)
                    .queryParam("radius", BASIC_DISTANCE)
                    .queryParam("page", page)
                    .queryParam("sort", "distance")
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToFlux(APIUtilityResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(LocationExceptionSet.KAKAO_SERVER));
    }

    public List<APIUtilityDocument> requestSubway(double x, double y) {
        List<APIUtilityDocument> apiUtilityDocuments = new ArrayList<>();

        APIUtilityResponse apiUtilityResponse;
        int page = 1;
        do {
            apiUtilityResponse
                = receivedUtilityResponse(LocationCategory.SW8.getCode(), x, y, page++);
            apiUtilityDocuments.addAll(apiUtilityResponse.getDocuments());
        } while (!apiUtilityResponse.getMeta().isEnd());

        return apiUtilityDocuments;
    }
}
