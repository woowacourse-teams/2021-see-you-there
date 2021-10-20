package seeuthere.goodday.path.domain.requester;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.util.UtilityParser;
import seeuthere.goodday.path.domain.PathCandidate;
import seeuthere.goodday.path.domain.PathCandidates;
import seeuthere.goodday.path.domain.PathData;
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

    public Map<PathCandidate, APITransportResponse> pathsByTransport(List<PathCandidate> pathCandidates,
        TransportURL transportURL) {

        Map<PathCandidate, APITransportResponse> map = new HashMap<>();

        for (PathCandidate pathCandidate : pathCandidates) {
            Point nearbyStation = UtilityParser.parsePoint(pathCandidate);
            Point targetPosition = pathCandidate.getDestination().getPoint();

            webClient.get()
                .uri(uriBuilder ->
                    uriBuilder.path(transportURL.getUrl())
                        .queryParam("ServiceKey", secretKey.getTransportApiKey())
                        .queryParam("startX", nearbyStation.getX())
                        .queryParam("startY", nearbyStation.getY())
                        .queryParam("endX", targetPosition.getX())
                        .queryParam("endY", targetPosition.getY())
                        .build()
                )
                .accept(MediaType.APPLICATION_XML)
                .retrieve()
                .bodyToMono(APITransportResponse.class)
                .subscribe(apiTransportResponse -> map.put(pathCandidate, apiTransportResponse));
        }
        return map;
    }
}
