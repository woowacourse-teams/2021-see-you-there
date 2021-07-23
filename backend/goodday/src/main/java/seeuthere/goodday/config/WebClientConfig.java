package seeuthere.goodday.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.secret.SecretKey;

@Configuration
public class WebClientConfig {

    @Bean
    @Qualifier("KakaoWebClient")
    public WebClient kakaoWebClient(ObjectMapper baseConfig) {
        ExchangeStrategies exchangeStrategies = getExchangeStrategies(baseConfig);

        return WebClient.builder()
            .baseUrl("https://dapi.kakao.com")
            .exchangeStrategies(exchangeStrategies)
            .defaultHeader("Authorization", "KakaoAK " + SecretKey.KAKAO_API_KEY)
            .build();
    }

    @Bean
    @Qualifier("TransportWebClient")
    public WebClient transportWebClient(ObjectMapper baseConfig) {
        ExchangeStrategies exchangeStrategies = getExchangeStrategies(baseConfig);

        return WebClient.builder()
            .baseUrl("http://ws.bus.go.kr/api/rest/pathinfo")
            .exchangeStrategies(exchangeStrategies)
            .build();
    }

    private ExchangeStrategies getExchangeStrategies(ObjectMapper baseConfig) {
        ObjectMapper newMapper = baseConfig.copy();
        newMapper.setPropertyNamingStrategy(PropertyNamingStrategy.SNAKE_CASE);

        return ExchangeStrategies.builder()
            .codecs(configurer ->
                configurer.defaultCodecs().jackson2JsonDecoder(new Jackson2JsonDecoder(newMapper)))
            .build();
    }
}
