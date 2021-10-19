package seeuthere.goodday.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.DefaultUriBuilderFactory.EncodingMode;
import seeuthere.goodday.secret.SecretKey;

@Configuration
@DependsOn("SecretKey")
public class WebClientConfig {

    private final SecretKey secretKey;

    public WebClientConfig(SecretKey secretKey) {
        this.secretKey = secretKey;
    }

    @Bean
    @Qualifier("KakaoWebClient")
    public WebClient kakaoWebClient(ObjectMapper baseConfig) {
        ExchangeStrategies exchangeStrategies = getExchangeStrategies(baseConfig);

        return WebClient.builder()
            .baseUrl("https://dapi.kakao.com")
            .exchangeStrategies(exchangeStrategies)
            .defaultHeader("Authorization", "KakaoAK " + secretKey.getKakaoApiKey())
            .build();
    }

    @Bean
    @Qualifier("TransportWebClient")
    public WebClient transportWebClient(ObjectMapper baseConfig) {
        ExchangeStrategies exchangeStrategies = getExchangeStrategies(baseConfig);
        String apiUrl = "http://ws.bus.go.kr/api/rest/pathinfo";
        DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory(apiUrl);
        factory.setEncodingMode(EncodingMode.VALUES_ONLY);

        return WebClient.builder()
            .baseUrl(apiUrl)
            .uriBuilderFactory(factory)
            .exchangeStrategies(exchangeStrategies)
            .build();
    }

    @Bean
    @Qualifier("KakaoHostClient")
    public WebClient kakaoHostClient(ObjectMapper baseConfig) {
        ExchangeStrategies exchangeStrategies = getExchangeStrategies(baseConfig);
        return WebClient.builder()
            .baseUrl("https://kapi.kakao.com")
            .exchangeStrategies(exchangeStrategies)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    @Bean
    @Qualifier("KakaoAuthClient")
    public WebClient kakaoAuthClient(ObjectMapper baseConfig) {
        ExchangeStrategies exchangeStrategies = getExchangeStrategies(baseConfig);
        return WebClient.builder()
            .baseUrl("https://kauth.kakao.com")
            .exchangeStrategies(exchangeStrategies)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();
    }

    private ExchangeStrategies getExchangeStrategies(ObjectMapper baseConfig) {
        ObjectMapper newMapper = baseConfig.copy();
        newMapper.setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

        return ExchangeStrategies.builder()
            .codecs(configurer ->
                configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(newMapper)))
            .build();
    }
}
