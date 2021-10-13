package seeuthere.goodday.location.temp;

import reactor.core.publisher.Mono;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;

public class Temp {

    private final Point userPoint;
    private final Mono<APIUtilityResponse> userNearStation;
    private final StationPoint destination;

    public Temp(Point userPoint,
        Mono<APIUtilityResponse> userNearStation,
        StationPoint destination) {
        this.userPoint = userPoint;
        this.userNearStation = userNearStation;
        this.destination = destination;
    }

    public Point getUserPoint() {
        return userPoint;
    }

    public Mono<APIUtilityResponse> getUserNearStation() {
        return userNearStation;
    }

    public StationPoint getDestination() {
        return destination;
    }
}
