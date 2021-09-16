package seeuthere.goodday.path.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.path.domain.requester.TransportRequester;
import seeuthere.goodday.secret.SecretKey;

@Configuration
@DependsOn("SecretKey")
public class PathRequestConfig {

    private final WebClient transportClient;
    private final SecretKey secretKey;

    public PathRequestConfig(@Qualifier("TransportWebClient") WebClient transportClient,
        SecretKey secretKey) {
        this.transportClient = transportClient;
        this.secretKey = secretKey;
    }

    @Bean
    public TransportRequester transportRequester() {
        return new TransportRequester(transportClient, secretKey);
    }
}
