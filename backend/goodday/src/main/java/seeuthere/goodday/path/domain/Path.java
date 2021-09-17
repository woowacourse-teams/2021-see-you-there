package seeuthere.goodday.path.domain;

import java.util.ArrayList;
import java.util.List;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.algorithm.Interval;

public class Path implements Comparable<Path> {

    private static final int PENALTY_WEIGHT = 7;

    private final List<Route> routes;
    private final int distance;
    private final int time;
    private final int walkTime;

    public Path(List<Route> routes, int distance, int time, int walkTime) {
        this.routes = routes;
        this.distance = distance;
        this.time = time;
        this.walkTime = walkTime;
    }

    public static Path walkPath(PointWithName startPointWithName, PointWithName endPointWithName) {
        Point start = startPointWithName.getPoint();
        Point end = endPointWithName.getPoint();

        Interval interval = Interval.calculate(start, end);
        List<Route> routes = new ArrayList<>();

        routes.add(new Route.Builder()
            .startX(start.getX())
            .startY(start.getY())
            .startName(startPointWithName.getName())
            .routeName("걷기")
            .endX(end.getX())
            .endY(end.getY())
            .endName(endPointWithName.getName())
            .build()
        );
        return new Path(routes, interval.distance(), interval.walkTime(), interval.walkTime());
    }

    public Path addWalkRoute(PointWithName startPointWithName, PointWithName endPointWithName) {
        Interval startWalkInterval = startWalkDistance(startPointWithName.getPoint());
        Interval endWalkInterval = endWalkDistance(endPointWithName.getPoint());

        int penaltyTime = (routes.size() - 1) * PENALTY_WEIGHT;

        if (startWalkInterval.isValidate()) {
            addStartRoute(startPointWithName);
        }

        if (endWalkInterval.isValidate()) {
            addLastRoute(endPointWithName);
        }

        int newDistance = distance + startWalkInterval.distance() + endWalkInterval.distance();
        int newTime = startWalkInterval.walkTime() + endWalkInterval.walkTime() + penaltyTime;
        return new Path(routes, newDistance, time + newTime, newTime);
    }

    private Interval startWalkDistance(Point point) {
        Route route = routes.get(0);
        return Interval.calculate(point, new Point(route.getStartX(),
            route.getStartY()));
    }

    private Interval endWalkDistance(Point point) {
        Route route = routes.get(routes.size() - 1);
        return Interval.calculate(point, new Point(route.getEndX(),
            route.getEndY()));
    }

    public void addStartRoute(PointWithName startPointWithName) {
        Route startRoute = routes.get(0);
        Route startWalkRoute = startWalkRoute(startPointWithName, startRoute);
        routes.add(0, startWalkRoute);
    }

    private Route startWalkRoute(PointWithName startPointWithName, Route startRoute) {
        Point start = startPointWithName.getPoint();

        return new Route.Builder()
            .startX(start.getX())
            .startY(start.getY())
            .startName(startPointWithName.getName())
            .routeName("걷기")
            .endX(startRoute.getEndX())
            .endY(startRoute.getEndY())
            .endName(startRoute.getStartName())
            .build();
    }

    public void addLastRoute(PointWithName endPointWithName) {
        Route endRoute = routes.get(routes.size() - 1);
        Route lastWalkRoute = lastWalkRoute(endPointWithName, endRoute);
        routes.add(lastWalkRoute);
    }

    private Route lastWalkRoute(PointWithName endPointWithName, Route endRoute) {
        Point end = endPointWithName.getPoint();

        return new Route.Builder()
            .startX(endRoute.getEndX())
            .startY(endRoute.getEndY())
            .startName(endRoute.getEndName())
            .routeName("걷기")
            .endX(end.getX())
            .endY(end.getY())
            .endName(endPointWithName.getName())
            .build();
    }

    @Override
    public int compareTo(Path path) {
        if (time <= path.time) {
            return -1;
        }
        return 1;
    }

    public List<Route> getRoutes() {
        return routes;
    }

    public int getDistance() {
        return distance;
    }

    public int getTime() {
        return time;
    }

    public int getWalkTime() {
        return walkTime;
    }
}
