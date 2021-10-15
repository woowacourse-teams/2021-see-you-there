package seeuthere.goodday.path.domain;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.location.domain.location.Point;

public class Paths {

    private final List<Path> pathRegistry;
    private final Point startPoint;
    private final Point endPoint;

    public Paths(List<Path> pathRegistry, Point startPoint,
        Point endPoint) {
        this.pathRegistry = pathRegistry;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    public Paths pathsWithWalk(PointWithName startPointWithName, PointWithName endPointWithName) {
        if (pathRegistry.isEmpty()) {
            return onlyWalkPath(startPointWithName, endPointWithName);
        }
        return new Paths(pathRegistry.stream()
            .map(path -> path.addWalkRoute(startPointWithName, endPointWithName))
            .collect(Collectors.toList()), startPoint, endPoint);
    }

    public void sort() {
        Collections.sort(pathRegistry);
    }

    public List<Path> getPathRegistry() {
        return pathRegistry;
    }

    private Paths onlyWalkPath(PointWithName startPointWithName, PointWithName endPointWithName) {
        Path path = Path.walkPath(startPointWithName, endPointWithName);
        pathRegistry.add(path);
        return new Paths(Collections.singletonList(path), startPoint, endPoint);
    }

    public Point getStartPoint() {
        return startPoint;
    }

    public Point getEndPoint() {
        return endPoint;
    }
}
