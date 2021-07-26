package seeuthere.goodday.path.domain.requester;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.util.TransportURL;
import seeuthere.goodday.secret.SecretKey;

public class TransportRequester {

    private final WebClient webClient;

    public TransportRequester(@Qualifier("TransportWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public APITransportResponse transportPath(Point start, Point end, TransportURL transportURL) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(transportURL.getUrl())
                    .queryParam("ServiceKey", SecretKey.TRANSPORT_API_KEY)
                    .queryParam("startX", start.getX())
                    .queryParam("startY", start.getY())
                    .queryParam("endX", end.getX())
                    .queryParam("endY", end.getY())
                    .build()
            )
            .accept(MediaType.APPLICATION_XML)
            .retrieve()
            .bodyToMono(APITransportResponse.class)
            .block();
    }
}
