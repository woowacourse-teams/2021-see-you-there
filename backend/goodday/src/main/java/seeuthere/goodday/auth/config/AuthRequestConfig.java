package seeuthere.goodday.auth.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class AuthRequestConfig {

    private final WebClient kakaoHostClient;
    private final WebClient kakaoAuthClient;
    private final WebClient naverAuthClient;

    public AuthRequestConfig(@Qualifier("KakaoHostClient") WebClient kakaoHostClient,
        @Qualifier("KakaoAuthClient") WebClient kakaoAuthClient,
        @Qualifier("NaverAuthClient") WebClient naverWebClient) {
        this.kakaoHostClient = kakaoHostClient;
        this.kakaoAuthClient = kakaoAuthClient;
        this.naverAuthClient = naverWebClient;
    }

    @Bean
    public AuthRequesters authRequesters() {
        return new AuthRequesters(kakaoHostClient, kakaoAuthClient);
    }

    @Bean
    public NaverAuthRequester naverAuthRequester() {
        return new NaverAuthRequester(naverAuthClient);
    }
}
