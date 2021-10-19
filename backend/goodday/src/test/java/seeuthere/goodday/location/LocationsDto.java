package seeuthere.goodday.location;

import java.util.ArrayList;
import java.util.List;
import seeuthere.goodday.location.domain.location.Point;

public class LocationsDto {

    private final List<Point> locations = new ArrayList<>();

    public void add(Point point) {
        locations.add(point);
    }

    public List<Point> getLocations() {
        return locations;
    }
}
