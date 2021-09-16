package seeuthere.goodday.path.domain.requester;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.exception.PathExceptionSet;
import seeuthere.goodday.path.util.TransportURL;
import seeuthere.goodday.secret.SecretKey;

public class TransportRequester {

    private final WebClient webClient;
    private final SecretKey secretKey;

    public TransportRequester(@Qualifier("TransportWebClient") WebClient webClient,
        SecretKey secretKey) {
        this.webClient = webClient;
        this.secretKey = secretKey;
    }

    public APITransportResponse transportPath(Point start, Point end, TransportURL transportURL) {
        return webClient.get()
            .uri(uriBuilder ->
                uriBuilder.path(transportURL.getUrl())
                    .queryParam("ServiceKey", secretKey.getTransportApiKey())
                    .queryParam("startX", start.getX())
                    .queryParam("startY", start.getY())
                    .queryParam("endX", end.getX())
                    .queryParam("endY", end.getY())
                    .build()
            )
            .accept(MediaType.APPLICATION_XML)
            .retrieve()
            .bodyToFlux(APITransportResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(PathExceptionSet.API_SERVER));
    }
}
