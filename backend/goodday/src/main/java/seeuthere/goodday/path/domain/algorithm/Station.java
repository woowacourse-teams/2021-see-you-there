package seeuthere.goodday.path.domain.algorithm;

import seeuthere.goodday.location.domain.location.Point;

public class Station {

    private final Point point;

    public Station(Point point) {
        this.point = point;
    }

    public Point getPoint() {
        return this.point;
    }

    @Override
    public String toString() {
        return "Station{" +
            "point=" + point +
            '}';
    }
}
