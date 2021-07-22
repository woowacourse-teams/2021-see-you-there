package seeuthere.goodday.location.dto.response;

public class MiddlePointResponse {

    private double x;
    private double y;

    public MiddlePointResponse() {
    }

    public MiddlePointResponse(double x, double y) {
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
