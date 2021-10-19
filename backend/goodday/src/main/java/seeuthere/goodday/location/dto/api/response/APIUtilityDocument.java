package seeuthere.goodday.location.dto.api.response;

import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.algorithm.Station;

public class APIUtilityDocument {

    private String placeName;
    private String distance;
    private String addressName;
    private String roadAddressName;
    private String placeUrl;
    private double x;
    private double y;

    public String getPlaceName() {
        return placeName;
    }

    public String getDistance() {
        return distance;
    }

    public String getAddressName() {
        return addressName;
    }

    public String getRoadAddressName() {
        return roadAddressName;
    }

    public String getPlaceUrl() {
        return placeUrl;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public Station toStation() {
        return new Station(new Point(x, y));
    }
}
