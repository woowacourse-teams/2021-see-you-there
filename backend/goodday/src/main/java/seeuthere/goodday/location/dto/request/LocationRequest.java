package seeuthere.goodday.location.dto.request;

public class LocationRequest {

    private double x;
    private double y;
    // 여기에 이름 추가

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
