package seeuthere.goodday.location.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class LocationRequestConfig {

    private final WebClient kakaoWebClient;

    public LocationRequestConfig(@Qualifier("KakaoWebClient") WebClient kakaoWebClient) {
        this.kakaoWebClient = kakaoWebClient;
    }

    @Bean
    public Requesters requesters() {
        return new Requesters(kakaoWebClient);
    }
}
