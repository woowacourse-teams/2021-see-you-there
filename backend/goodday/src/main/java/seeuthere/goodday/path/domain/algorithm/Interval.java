package seeuthere.goodday.path.domain.algorithm;

import seeuthere.goodday.location.domain.location.Point;

public class Interval {

    private static final int MIN_DISTANCE = 67;

    private final int distance;

    private Interval(int distance) {
        this.distance = distance;
    }

    public static Interval calculate(Point start, Point end) {
        double theta = start.getX() - end.getX();
        double dist =
            Math.sin(deg2rad(start.getY())) * Math.sin(deg2rad(end.getY())) + Math.cos(deg2rad(
                start.getY())) * Math.cos(deg2rad(end.getY())) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1609.344;

        return new Interval((int) dist);
    }

    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }

    public int distance() {
        if (!isValidate()) {
            return 0;
        }
        return distance;
    }

    public int walkTime() {
        return (int) (distance() / 66.6);
    }

    public boolean isValidate() {
        return distance > MIN_DISTANCE;
    }
}
