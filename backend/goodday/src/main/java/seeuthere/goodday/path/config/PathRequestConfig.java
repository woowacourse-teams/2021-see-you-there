package seeuthere.goodday.path.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.path.domain.requester.TransportRequester;

@Configuration
public class PathRequestConfig {

    private final WebClient transportClient;

    public PathRequestConfig(@Qualifier("TransportWebClient") WebClient transportClient) {
        this.transportClient = transportClient;
    }

    @Bean
    public TransportRequester transportRequester() {
        return new TransportRequester(transportClient);
    }
}
