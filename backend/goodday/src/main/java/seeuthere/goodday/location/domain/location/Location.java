package seeuthere.goodday.location.domain.location;

public class Location {

    private final double x;
    private final double y;
    private final String address;
    private final String roadAddress;
    private final String placeUrl;
    private final String name;

    private Location(Builder builder) {
        x = builder.x;
        y = builder.y;
        address = builder.address;
        roadAddress = builder.roadAddress;
        placeUrl = builder.placeUrl;
        name = builder.name;
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

    public static class Builder {

        private double x = 0;
        private double y = 0;
        private String address = "";
        private String roadAddress = "";
        private String placeUrl = "";
        private String name = "";

        public Builder() {
        }

        public Builder x(double x) {
            this.x = x;
            return this;
        }

        public Builder y(double y) {
            this.y = y;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder roadAddress(String roadAddress) {
            this.roadAddress = roadAddress;
            return this;
        }

        public Builder placeUrl(String placeUrl) {
            this.placeUrl = placeUrl;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Location build() {
            return new Location(this);
        }
    }
}
