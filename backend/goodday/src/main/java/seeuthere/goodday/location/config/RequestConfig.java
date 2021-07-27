package seeuthere.goodday.location.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.requester.LocationRequester;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.domain.requester.UtilityRequester;

@Configuration
public class RequestConfig {

    private final WebClient kakaoWebClient;

    public RequestConfig(@Qualifier("KakaoWebClient") WebClient kakaoWebClient) {
        this.kakaoWebClient = kakaoWebClient;
    }

    @Bean
    public CoordinateRequester coordinateRequester() {
        return new CoordinateRequester(kakaoWebClient);
    }

    @Bean
    public LocationRequester locationRequester() {
        return new LocationRequester(kakaoWebClient);
    }

    @Bean
    public SearchRequester searchRequester() {
        return new SearchRequester(kakaoWebClient);
    }

    @Bean
    public UtilityRequester utilityRequester() {
        return new UtilityRequester(kakaoWebClient);
    }
}
