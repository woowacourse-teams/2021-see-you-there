package seeuthere.goodday.path.domain;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
        StationPoints stationPoints, Map<Point, APIUtilityResponse> nearbyStations) {
        List<PathCandidate> pathCandidateRegistry = new ArrayList<>();
        List<StationPoint> candidateDestinations = stationPoints.getStationPointRegistry();

        Deque<Point> pointQueue = new ArrayDeque<>(userStartPoints.getPointRegistry());
        while (!pointQueue.isEmpty()) {
            Point startPoint = pointQueue.pollFirst();
            APIUtilityResponse apiUtilityResponse = nearbyStations.get(startPoint);
            if (Objects.isNull(apiUtilityResponse)) {
                pointQueue.add(startPoint);
                continue;
            }
            insertPathCandidate(apiUtilityResponse, pathCandidateRegistry, candidateDestinations,
                startPoint);
        }
        return new PathCandidates(pathCandidateRegistry);
    }

    private static void insertPathCandidate(APIUtilityResponse apiUtilityResponse,
        List<PathCandidate> pathCandidateRegistry, List<StationPoint> candidateDestinations,
        Point startPoint) {
        for (StationPoint stationPoint : candidateDestinations) {
            pathCandidateRegistry
                .add(new PathCandidate(startPoint, apiUtilityResponse,
                    stationPoint));
        }
    }

    public List<PathCandidate> getPathCandidateRegistry() {
        return pathCandidateRegistry;
    }
}
