package seeuthere.goodday.location.domain;

import java.util.List;
import java.util.Objects;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class MiddlePoint {

    private final double x;
    private final double y;

    public MiddlePoint(Location location) {
        this.x = location.getX();
        this.y = location.getY();
    }

    public static MiddlePoint valueOf(List<Location> locations) {
        validation(locations);
        return new MiddlePoint(calculation(locations));
    }

    private static void validation(List<Location> locations) {
        if (Objects.isNull(locations) || locations.size() <= 1) {
            throw new GoodDayException(LocationExceptionSet.NOT_ENOUGH_LOCATION);
        }
    }

    private static Location calculation(List<Location> locations) {
        double sumX = 0;
        double sumY = 0;
        for (Location location : locations) {
            sumX += location.getX();
            sumY += location.getY();
        }
        return new Location(sumX / locations.size(), sumY / locations.size());
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
