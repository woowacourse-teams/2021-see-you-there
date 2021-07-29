package seeuthere.goodday.path.domain.algorithm;

import seeuthere.goodday.location.domain.location.Point;

public class Station {

    private final String line;
    private final String name;
    private final Point point;

    public Station(String line, String name, Point point) {
        this.line = line;
        this.name = name;
        this.point = point;
    }

    public Point getPoint() {
        return this.point;
    }
}
