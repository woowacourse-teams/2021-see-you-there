package seeuthere.goodday.path.domain;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class Paths {

    private final List<Path> paths;

    public Paths(List<Path> paths) {
        this.paths = paths;
    }

    public List<Path> getPaths() {
        return paths;
    }

    public Paths pathsWithWalk(PointWithName startPointWithName, PointWithName endPointWithName) {
        if (paths.isEmpty()) {
            return onlyWalkPath(startPointWithName, endPointWithName);
        }
        return new Paths(paths.stream()
            .map(path -> path.addWalkRoute(startPointWithName, endPointWithName))
            .collect(Collectors.toList()));
    }

    public void sort() {
        Collections.sort(paths);
    }

    private Paths onlyWalkPath(PointWithName startPointWithName, PointWithName endPointWithName) {
        Path path = Path.walkPath(startPointWithName, endPointWithName);
        return new Paths(Collections.singletonList(path));
    }
}
