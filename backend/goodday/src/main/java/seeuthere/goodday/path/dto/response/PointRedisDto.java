package seeuthere.goodday.path.dto.response;

import seeuthere.goodday.location.domain.location.Point;

public class PointRedisDto {

    private double x;
    private double y;

    public PointRedisDto() {
    }

    public PointRedisDto(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public PointRedisDto(Point point) {
        this.x = point.getX();
        this.y = point.getY();
    }

    public Point toPoint() {
        return new Point(x, y);
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
