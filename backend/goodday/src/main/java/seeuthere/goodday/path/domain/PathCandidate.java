package seeuthere.goodday.path.domain;

import java.util.Objects;
import reactor.core.publisher.Mono;
import seeuthere.goodday.location.domain.StationPoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;

public class PathCandidate {

    private final Point userPoint;
    private final APIUtilityResponse userNearStation;
    private final StationPoint destination;

    public PathCandidate(Point userPoint,
        APIUtilityResponse userNearStation,
        StationPoint destination) {
        this.userPoint = userPoint;
        this.userNearStation = userNearStation;
        this.destination = destination;
    }

    public Point getUserPoint() {
        return userPoint;
    }

    public APIUtilityResponse getUserNearStation() {
        return userNearStation;
    }

    public StationPoint getDestination() {
        return destination;
    }

    public APIUtilityDocument apiUtilityDocument() {
        return Objects.requireNonNull(userNearStation).getDocuments().get(0);
    }
}
