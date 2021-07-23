package seeuthere.goodday.path.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.requester.TransportRequester;

@Service
public class PathService {

    private final WebClient webClient;

    public PathService(@Qualifier("TransportWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public void findBusPath(Point start, Point end) {
        TransportRequester transportRequester = new TransportRequester(webClient);
        transportRequester.busPath(start, end);
    }
}
