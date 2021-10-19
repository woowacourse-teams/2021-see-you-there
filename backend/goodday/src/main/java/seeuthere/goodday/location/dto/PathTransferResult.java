package seeuthere.goodday.location.dto;

import seeuthere.goodday.location.domain.algorithm.PathResult;
import seeuthere.goodday.location.domain.location.Point;

public class PathTransferResult {

    private final Point source;
    private final Point target;
    private final PathResult pathResult;

    public PathTransferResult(Point source, Point target,
        PathResult pathResult) {
        this.source = source;
        this.target = target;
        this.pathResult = pathResult;
    }

    public Point getSource() {
        return source;
    }

    public Point getTarget() {
        return target;
    }

    public PathResult getPathResult() {
        return pathResult;
    }
}
