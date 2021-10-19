package seeuthere.goodday.location.dto;

import seeuthere.goodday.location.domain.location.Point;

public class PointWithName {

    private final Point point;
    private final String name;

    public PointWithName(Point point, String name) {
        this.point = point;
        this.name = name;
    }

    public Point getPoint() {
        return point;
    }

    public String getName() {
        return name;
    }
}
