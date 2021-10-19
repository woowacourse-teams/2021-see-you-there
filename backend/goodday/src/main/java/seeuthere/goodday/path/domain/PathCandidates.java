package seeuthere.goodday.path.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import reactor.core.publisher.Mono;
import seeuthere.goodday.location.domain.StationPoint;
import seeuthere.goodday.location.domain.StationPoints;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;

public class PathCandidates {

    private final List<PathCandidate> pathCandidateRegistry;

    public PathCandidates(List<PathCandidate> pathCandidateRegistry) {
        this.pathCandidateRegistry = pathCandidateRegistry;
    }

    public static PathCandidates valueOf(Points userStartPoints,
        StationPoints stationPoints,
        Map<Point, Mono<APIUtilityResponse>> nearbyStations) {
        List<PathCandidate> pathCandidateRegistry = new ArrayList<>();
        List<StationPoint> candidateDestinations = stationPoints.getStationPointRegistry();
        for (Point startPoint : userStartPoints.getPointRegistry()) {
            insertPathCandidate(nearbyStations, pathCandidateRegistry, candidateDestinations,
                startPoint);
        }
        return new PathCandidates(pathCandidateRegistry);
    }

    private static void insertPathCandidate(Map<Point, Mono<APIUtilityResponse>> nearbyStations,
        List<PathCandidate> pathCandidateRegistry, List<StationPoint> candidateDestinations,
        Point startPoint) {
        for (StationPoint stationPoint : candidateDestinations) {
            pathCandidateRegistry
                .add(new PathCandidate(startPoint, nearbyStations.get(startPoint),
                    stationPoint));
        }
    }

    public List<PathCandidate> getPathCandidateRegistry() {
        return pathCandidateRegistry;
    }
}
