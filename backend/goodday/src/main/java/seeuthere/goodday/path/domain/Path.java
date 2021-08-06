package seeuthere.goodday.path.domain;

import java.util.ArrayList;
import java.util.List;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.algorithm.Distance;

public class Path implements Comparable<Path> {

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

    public static Path walkPath(Point start, Point end) {
        Distance distance = Distance.calculate(start, end);
        List<Route> routes = new ArrayList<>();
        routes.add(new Route.Builder()
            .startX(start.getX())
            .startY(start.getY())
            .startName("출발점")
            .routeName("걷기")
            .endX(end.getX())
            .endY(end.getY())
            .endName("도착점")
            .build()
        );
        return new Path(routes, distance.value(), distance.walkTime(), distance.walkTime());
    }

    public Path addWalkRoute(Point start, Point end) {
        Distance startWalkDistance = startWalkDistance(start);
        addStartRoute(start);
        Distance endWalkDistance = endWalkDistance(end);
        addLastRoute(end);

        int newDistance =
            distance + startWalkDistance.value() + endWalkDistance.value();
        int newTime = startWalkDistance.walkTime() + endWalkDistance.walkTime();
        return new Path(routes, newDistance, time + newTime, newTime);
    }

    private Distance startWalkDistance(Point point) {
        Route route = routes.get(0);
        return Distance.calculate(point, new Point(route.getStartX(),
            route.getStartY()));
    }

    private Distance endWalkDistance(Point point) {
        Route route = routes.get(routes.size() - 1);
        return Distance.calculate(point, new Point(route.getEndX(),
            route.getEndY()));
    }

    public void addStartRoute(Point start) {
        Route startRoute = routes.get(0);
        Route startWalkRoute = startWalkRoute(start, startRoute);
        routes.add(0, startWalkRoute);
    }

    private Route startWalkRoute(Point start, Route startRoute) {
        return new Route.Builder()
            .startX(start.getX())
            .startY(start.getY())
            .startName("출발점")
            .routeName("걷기")
            .endX(startRoute.getEndX())
            .endY(startRoute.getEndY())
            .endName(startRoute.getStartName())
            .build();
    }

    public void addLastRoute(Point end) {
        Route endRoute = routes.get(routes.size() - 1);
        Route lastWalkRoute = lastWalkRoute(end, endRoute);
        routes.add(lastWalkRoute);
    }

    private Route lastWalkRoute(Point end, Route endtRoute) {
        return new Route.Builder()
            .startX(endtRoute.getEndX())
            .startY(endtRoute.getEndY())
            .startName(endtRoute.getEndName())
            .routeName("걷기")
            .endX(end.getX())
            .endY(end.getY())
            .endName("도착점")
            .build();
    }

    @Override
    public int compareTo(Path o) {
        if(time <= o.time) {
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
