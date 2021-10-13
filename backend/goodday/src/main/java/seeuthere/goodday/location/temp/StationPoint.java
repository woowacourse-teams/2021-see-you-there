package seeuthere.goodday.location.temp;

import seeuthere.goodday.location.domain.location.Point;

public class StationPoint {

    private final String key;
    private final Point point;

    public StationPoint(String key, double x, double y) {
        this(key, new Point(x, y));
    }

    public StationPoint(String key, Point point) {
        this.key = key;
        this.point = point;
    }

    public String getKey() {
        return key;
    }

    public Point getPoint() {
        return point;
    }
}
