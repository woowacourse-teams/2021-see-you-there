package seeuthere.goodday.path.domain;

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
        List<Path> pathsWithWalk = paths.stream()
            .map(path -> path.addWalkRoute(start, end))
            .collect(Collectors.toList());
        return new Paths(pathsWithWalk);
    }
}
