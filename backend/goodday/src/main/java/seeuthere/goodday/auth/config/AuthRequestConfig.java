package seeuthere.goodday.auth.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.secret.SecretKey;

@Configuration
@DependsOn("SecretKey")
public class AuthRequestConfig {

    private final WebClient kakaoHostClient;
    private final WebClient kakaoAuthClient;
    private final SecretKey secretKey;

    public AuthRequestConfig(@Qualifier("KakaoHostClient") WebClient kakaoHostClient,
        @Qualifier("KakaoAuthClient") WebClient kakaoAuthClient, SecretKey secretKey) {
        this.kakaoHostClient = kakaoHostClient;
        this.kakaoAuthClient = kakaoAuthClient;
        this.secretKey = secretKey;
    }

    @Bean
    public KakaoAuthRequester kakaoAuthRequester() {
        return new KakaoAuthRequester(kakaoHostClient, kakaoAuthClient, secretKey);
    }
}
