package seeuthere.goodday.location.temp;

import java.util.Objects;
import reactor.core.publisher.Mono;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;

public class PathData {

    private final PathCandidate pathCandidate;
    private final Mono<APITransportResponse> transportResponseMono;

    public PathData(PathCandidate pathCandidate, Mono<APITransportResponse> transportResponseMono) {
        this.pathCandidate = pathCandidate;
        this.transportResponseMono = transportResponseMono;
    }

    public PathCandidate getPathCandidate() {
        return pathCandidate;
    }

    public Mono<APITransportResponse> getTransportResponseMono() {
        return transportResponseMono;
    }

    public APITransportResponse apiTransportResponse() {
        return Objects.requireNonNull(transportResponseMono.block());
    }
}
