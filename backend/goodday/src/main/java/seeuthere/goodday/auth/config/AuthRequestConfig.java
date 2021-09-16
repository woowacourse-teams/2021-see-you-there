package seeuthere.goodday.auth.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AuthRequestConfig {

    private final WebClient kakaoHostClient;
    private final WebClient kakaoAuthClient;

    public AuthRequestConfig(@Qualifier("KakaoHostClient") WebClient kakaoHostClient,
        @Qualifier("KakaoAuthClient") WebClient kakaoAuthClient) {
        this.kakaoHostClient = kakaoHostClient;
        this.kakaoAuthClient = kakaoAuthClient;
    }

    @Bean
    public KakaoAuthRequester kakaoAuthRequester() {
        return new KakaoAuthRequester(kakaoHostClient, kakaoAuthClient);
    }
}
