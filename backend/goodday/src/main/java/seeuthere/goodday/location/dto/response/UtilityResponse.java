package seeuthere.goodday.location.dto.response;

import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;

public class UtilityResponse {

    private final String placeName;
    private final String distance;
    private final String addressName;
    private final String roadAddressName;
    private final double x;
    private final double y;

    public UtilityResponse(APIUtilityDocument apiUtilityDocument) {
        this.placeName = apiUtilityDocument.getPlaceName();
        this.distance = apiUtilityDocument.getDistance();
        this.addressName = apiUtilityDocument.getAddressName();
        this.roadAddressName = apiUtilityDocument.getRoadAddressName();
        this.x = apiUtilityDocument.getX();
        this.y = apiUtilityDocument.getY();
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
