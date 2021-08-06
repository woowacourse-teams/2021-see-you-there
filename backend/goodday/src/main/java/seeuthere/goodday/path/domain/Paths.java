package seeuthere.goodday.path.domain;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.location.domain.location.Point;

public class Paths {

    private final List<Path> paths;

    public Paths(List<Path> paths) {
        this.paths = paths;
    }

    public List<Path> getPaths() {
        return paths;
    }

    public Paths pathsWithWalk(Point start, Point end) {
        if (paths.isEmpty()) {
            return onlyWalkPath(start, end);
        }
        return new Paths(paths.stream()
            .map(path -> path.addWalkRoute(start, end))
            .collect(Collectors.toList()));
    }

    public void sort() {
        Collections.sort(paths);
    }

    private Paths onlyWalkPath(Point start, Point end) {
        Path path = Path.walkPath(start, end);
        return new Paths(Collections.singletonList(path));
    }
}
