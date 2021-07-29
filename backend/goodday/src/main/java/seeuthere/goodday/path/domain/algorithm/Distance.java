package seeuthere.goodday.path.domain.algorithm;

import seeuthere.goodday.location.domain.location.Point;

public class Distance {

    int distance;

    private Distance(int distance) {
        this.distance = distance;
    }

    public static Distance calculate(Point start, Point end) {
        double theta = start.getX() - end.getX();
        double dist =
            Math.sin(deg2rad(start.getY())) * Math.sin(deg2rad(end.getY())) + Math.cos(deg2rad(
                start.getY())) * Math.cos(deg2rad(end.getY())) * Math.cos(deg2rad(theta));

        dist = Math.acos(dist);
        dist = rad2deg(dist);
        dist = dist * 60 * 1.1515 * 1609.344;

        return new Distance((int) dist);
    }

    private static double deg2rad(double deg) {
        return (deg * Math.PI / 180.0);
    }

    private static double rad2deg(double rad) {
        return (rad * 180 / Math.PI);
    }

    public int value() {
        return distance;
    }

    public int walkTime() {
        return (int) (distance / 66.6) + 1;
    }
}
