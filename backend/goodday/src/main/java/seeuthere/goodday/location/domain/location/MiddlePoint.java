package seeuthere.goodday.location.domain.location;

import java.util.List;
import java.util.Objects;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class MiddlePoint {

    private final double x;
    private final double y;

    public MiddlePoint(Point point) {
        this.x = point.getX();
        this.y = point.getY();
    }

    public static MiddlePoint valueOf(List<Point> points) {
        validation(points);
        return new MiddlePoint(calculation(points));
    }

    private static void validation(List<Point> points) {
        if (Objects.isNull(points) || points.size() <= 1) {
            throw new GoodDayException(LocationExceptionSet.NOT_ENOUGH_LOCATION);
        }
    }

    private static Point calculation(List<Point> points) {
        double sumX = 0;
        double sumY = 0;
        for (Point point : points) {
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
