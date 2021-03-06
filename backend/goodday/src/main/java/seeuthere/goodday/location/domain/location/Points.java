package seeuthere.goodday.location.domain.location;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.request.LocationRequest;
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class Points {

    private final List<Point> pointRegistry;

    public Points(List<Point> pointRegistry) {
        validation(pointRegistry);
        this.pointRegistry = pointRegistry;
    }

    public static Points valueOf(LocationsRequest locationsRequest) {
        List<Point> points = new ArrayList<>();

        for (LocationRequest locationRequest : locationsRequest.getLocationRequests()) {
            points.add(new Point(locationRequest.getX(), locationRequest.getY()));
        }

        return new Points(points);
    }

    private void validation(List<Point> points) {
        if (Objects.isNull(points) || points.size() <= 1) {
            throw new GoodDayException(LocationExceptionSet.NOT_ENOUGH_LOCATION);
        }
    }

    public int size() {
        return pointRegistry.size();
    }

    public List<Point> getPointRegistry() {
        return pointRegistry;
    }
}
