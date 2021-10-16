package seeuthere.goodday.path.domain;

import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.PointWithName;
import seeuthere.goodday.path.domain.api.Paths;

public class CalibratedWalkPath {

    private final Paths paths;

    public CalibratedWalkPath(Paths paths) {
        this.paths = paths;
    }

    public static CalibratedWalkPath valueOf(Paths paths, Point startPoint, Point endPoint) {
        PointWithName startPointWithName = new PointWithName(startPoint, "출발점");
        PointWithName endPointWithName = new PointWithName(endPoint, "도착점");
        Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
        walkWithPaths.sort();
        return new CalibratedWalkPath(walkWithPaths);
    }

    public Paths getPaths() {
        return paths;
    }
}
