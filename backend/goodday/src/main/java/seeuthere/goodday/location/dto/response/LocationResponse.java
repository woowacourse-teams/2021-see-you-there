package seeuthere.goodday.location.dto.response;

import seeuthere.goodday.location.domain.location.Location;

public class LocationResponse {

    private final double x;
    private final double y;
    private final String address;
    private final String roadAddress;
    private final String placeUrl;
    private final String name;

    public LocationResponse(Location location) {
        x = location.getX();
        y = location.getY();
        address = location.getAddress();
        roadAddress = location.getRoadAddress();
        placeUrl = location.getPlaceUrl();
        name = location.getName();
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public String getAddress() {
        return address;
    }

    public String getRoadAddress() {
        return roadAddress;
    }

    public String getPlaceUrl() {
        return placeUrl;
    }

    public String getName() {
        return name;
    }
}
