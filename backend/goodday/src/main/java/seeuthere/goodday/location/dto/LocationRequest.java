package seeuthere.goodday.location.dto;

public class LocationRequest {

    private double x;
    private double y;

    public LocationRequest() {
    }

    public LocationRequest(double x, double y) {
        this.x = x;
        this.y = y;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
