package seeuthere.goodday.location.domain;

public class Location {

    private double x;
    private double y;

    public Location() {
    }

    public Location(double x, double y) {
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
