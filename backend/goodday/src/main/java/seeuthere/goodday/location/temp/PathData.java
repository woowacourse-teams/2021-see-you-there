package seeuthere.goodday.location.temp;

import reactor.core.publisher.Mono;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;

public class PathData {

    private final Temp temp;
    private final Mono<APITransportResponse> transportResponseMono;

    public PathData(Temp temp, Mono<APITransportResponse> transportResponseMono) {
        this.temp = temp;
        this.transportResponseMono = transportResponseMono;
    }

    public Temp getTemp() {
        return temp;
    }

    public Mono<APITransportResponse> getTransportResponseMono() {
        return transportResponseMono;
    }
}
