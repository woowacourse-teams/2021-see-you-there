package seeuthere.goodday.path.domain;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class Paths {

    private final List<Path> pathRegistry;

    public Paths(List<Path> pathRegistry) {
        this.pathRegistry = pathRegistry;
    }

    public List<Path> getPaths() {
        return pathRegistry;
    }

    public Paths pathsWithWalk(PointWithName startPointWithName, PointWithName endPointWithName) {
        if (pathRegistry.isEmpty()) {
            return onlyWalkPath(startPointWithName, endPointWithName);
        }
        return new Paths(pathRegistry.stream()
            .map(path -> path.addWalkRoute(startPointWithName, endPointWithName))
            .collect(Collectors.toList()));
    }

    public void sort() {
        Collections.sort(pathRegistry);
    }

    private Paths onlyWalkPath(PointWithName startPointWithName, PointWithName endPointWithName) {
        Path path = Path.walkPath(startPointWithName, endPointWithName);
        return new Paths(Collections.singletonList(path));
    }
}
