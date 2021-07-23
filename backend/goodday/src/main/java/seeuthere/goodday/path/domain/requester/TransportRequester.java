package seeuthere.goodday.path.domain.requester;

import io.restassured.internal.http.URIBuilder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import org.springframework.web.util.UriBuilder;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.util.TransportURL;
import seeuthere.goodday.secret.SecretKey;

public class TransportRequester {

    private final WebClient webClient;

    public TransportRequester(@Qualifier("TransportWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public void busPath(Point start, Point end) {

        String s = webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(TransportURL.SUBWAY.getUrl())
                    .queryParam("ServiceKey", SecretKey.TRANSPORT_API_KEY)
                    .queryParam("startX", start.getX())
                    .queryParam("startY", start.getY())
                    .queryParam("endX", end.getX())
                    .queryParam("endY", end.getY())
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(String.class)
            .block();

        System.out.println(s);
    }

    public void subwayPath(Point start, Point end) {
        webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(TransportURL.SUBWAY.getUrl())
                    .queryParam("ServiceKey", SecretKey.TRANSPORT_API_KEY)
                    .queryParam("startX", start.getX())
                    .queryParam("startY", start.getY())
                    .queryParam("endX", end.getX())
                    .queryParam("endY", end.getY())
                    .build())
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

    }

    public void transferPath(Point start, Point end) {
        webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(TransportURL.BUS_AND_SUBWAY.getUrl())
                    .queryParam("ServiceKey", SecretKey.TRANSPORT_API_KEY)
                    .queryParam("startX", start.getX())
                    .queryParam("startY", start.getY())
                    .queryParam("endX", end.getX())
                    .queryParam("endY", end.getY())
                    .build()
            )
            .accept(MediaType.APPLICATION_JSON)
            .retrieve()
            .bodyToMono(String.class)
            .block();
    }
}
