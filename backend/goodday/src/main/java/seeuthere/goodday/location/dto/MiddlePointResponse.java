package seeuthere.goodday.location.dto;

public class MiddlePointResponse {

    private final double x;
    private final double y;

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
