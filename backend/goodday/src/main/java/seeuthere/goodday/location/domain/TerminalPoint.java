package seeuthere.goodday.location.domain;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import seeuthere.goodday.location.domain.algorithm.StationGrades;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.path.domain.api.Path;
import seeuthere.goodday.path.domain.api.Paths;

public class TerminalPoint {

    private final double x;
    private final double y;

    public TerminalPoint(StationPoint stationPoint) {
        Point point = stationPoint.getPoint();
        this.x = point.getX();
        this.y = point.getY();
    }

    public static TerminalPoint valueOf(Points userStartPoints, StationPoints stationPoints,
        List<Paths> transportPathResults) {
        List<StationPoint> candidateDestinations = stationPoints.getStationPointRegistry();
        Map<Point, Map<Point, Path>> pathFromSourceToTarget = mapPath(transportPathResults);

        StationGrades stationGrades = StationGrades
            .valueOf(userStartPoints, candidateDestinations, pathFromSourceToTarget);

        StationPoint terminalStationPoint = stationGrades.findStationPoint();
        return new TerminalPoint(terminalStationPoint);
    }

    private static Map<Point, Map<Point, Path>> mapPath(List<Paths> transportPaths) {
        Map<Point, Map<Point, Path>> pathFromSourceToTarget = new HashMap<>();
        for (Paths paths : transportPaths) {
            Path path = paths.getPathRegistry().get(0);
            Point startPoint = paths.getStartPoint();
            Point endPoint = paths.getEndPoint();
            Map<Point, Path> pointKeyValuePath = pathFromSourceToTarget
                .getOrDefault(endPoint, new HashMap<>());
            insert(pointKeyValuePath, startPoint, path);
            pathFromSourceToTarget.put(endPoint, pointKeyValuePath);
        }
        return pathFromSourceToTarget;
    }

    private static void insert(Map<Point, Path> pointKeyValuePath, Point startPoint, Path path) {
        if (pointKeyValuePath.containsKey(startPoint)) {
            Path minPath = minPath(path, pointKeyValuePath.get(startPoint));
            pointKeyValuePath.put(startPoint, minPath);
            return;
        }
        pointKeyValuePath.put(startPoint, path);
    }

    private static Path minPath(Path busPath, Path subwayPath) {
        if (busPath.getTime() < subwayPath.getTime()) {
            return busPath;
        }
        return subwayPath;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
