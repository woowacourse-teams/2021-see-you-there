package seeuthere.goodday.location.dto.api.response;

public class APIUtilityDocument {

    private String placeName;
    private String distance;
    private String addressName;
    private String roadAddressName;
    private double x;
    private double y;

    public APIUtilityDocument() {

    }

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

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
