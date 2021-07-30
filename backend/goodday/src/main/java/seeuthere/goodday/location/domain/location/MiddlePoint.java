package seeuthere.goodday.location.domain.location;

public class MiddlePoint {

    private final double x;
    private final double y;

    public MiddlePoint(Point point) {
        this.x = point.getX();
        this.y = point.getY();
    }

    public static MiddlePoint valueOf(Points points) {
        return new MiddlePoint(calculation(points));
    }

    private static Point calculation(Points points) {
        double sumX = 0;
        double sumY = 0;
        for (Point point : points.getPoints()) {
            sumX += point.getX();
            sumY += point.getY();
        }
        return new Point(sumX / points.size(), sumY / points.size());
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
