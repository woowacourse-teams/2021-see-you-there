package seeuthere.goodday.path.service;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.requester.TransportRequester;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.util.TransportURL;

@Service
public class PathService {

    private final WebClient webClient;

    public PathService(@Qualifier("TransportWebClient") WebClient webClient) {
        this.webClient = webClient;
    }

    public PathsResponse findBusPath(Point start, Point end) {
        return getPathsResponse(start, end, TransportURL.BUS);
    }

    public PathsResponse findSubwayPath(Point start, Point end) {
        return getPathsResponse(start, end, TransportURL.SUBWAY);
    }

    public PathsResponse findTransferPath(Point start, Point end) {
        return getPathsResponse(start, end, TransportURL.BUS_AND_SUBWAY);
    }

    private PathsResponse getPathsResponse(Point start, Point end,
        TransportURL transportURL) {
        TransportRequester transportRequester = new TransportRequester(webClient);
        APITransportResponse apiTransportResponse =
            transportRequester.transportPath(start, end, transportURL);
        return PathsResponse.valueOf(apiTransportResponse.getMsgBody());
    }
}
