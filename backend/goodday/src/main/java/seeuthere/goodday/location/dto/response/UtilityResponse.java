package seeuthere.goodday.location.dto.response;

import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;

public class UtilityResponse {

    private final String placeName;
    private final String distance;
    private final String addressName;
    private final String roadAddressName;
    private final String placeUrl;
    private final double x;
    private final double y;

    public UtilityResponse(APIUtilityDocument apiUtilityDocument) {
        this.placeName = apiUtilityDocument.getPlaceName();
        this.distance = apiUtilityDocument.getDistance();
        this.addressName = apiUtilityDocument.getAddressName();
        this.roadAddressName = apiUtilityDocument.getRoadAddressName();
        this.placeUrl = apiUtilityDocument.getPlaceUrl();
        this.x = apiUtilityDocument.getX();
        this.y = apiUtilityDocument.getY();
    }

    public UtilityResponse(Builder builder) {
        this.placeName = builder.placeName;
        this.distance = builder.distance;
        this.addressName = builder.addressName;
        this.roadAddressName = builder.roadAddressName;
        this.placeUrl = builder.placeUrl;
        this.x = builder.x;
        this.y = builder.y;
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

    public String getPlaceUrl() {
        return placeUrl;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public static class Builder {

        private String placeName = "";
        private String distance = "";
        private String addressName = "";
        private String roadAddressName = "";
        private String placeUrl = "";
        private double x;
        private double y;

        public Builder placeName(String placeName) {
            this.placeName = placeName;
            return this;
        }

        public Builder distance(String distance) {
            this.distance = distance;
            return this;
        }

        public Builder addressName(String addressName) {
            this.addressName = addressName;
            return this;
        }

        public Builder roadAddressName(String roadAddressName) {
            this.roadAddressName = roadAddressName;
            return this;
        }

        public Builder placeUrl(String placeUrl) {
            this.placeUrl = placeUrl;
            return this;
        }

        public Builder x(double x) {
            this.x = x;
            return this;
        }

        public Builder y(double y) {
            this.y = y;
            return this;
        }

        public UtilityResponse build() {
            return new UtilityResponse(this);
        }
    }
}
