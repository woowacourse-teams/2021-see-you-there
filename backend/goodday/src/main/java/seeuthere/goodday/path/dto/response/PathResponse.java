package seeuthere.goodday.path.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.path.domain.api.Path;
import seeuthere.goodday.path.dto.api.response.APIItemListResponse;

public class PathResponse {

    private List<RouteResponse> routes = new ArrayList<>();
    private int distance;
    private int time;
    private int walkTime;

    public PathResponse() {
    }

    public PathResponse(List<RouteResponse> routes, int distance, int time, int walkTime) {
        this.routes = routes;
        this.distance = distance;
        this.time = time;
        this.walkTime = walkTime;
    }

    public static PathResponse valueOf(APIItemListResponse apiItemListResponse) {
        int distance = apiItemListResponse.getDistance();
        int time = apiItemListResponse.getTime();
        List<RouteResponse> pathResponses = getPathResponses(apiItemListResponse);
        return new PathResponse(pathResponses, distance, time, 0);
    }

    public static PathResponse valueOf(Path path) {
        List<RouteResponse> routeResponses = path.getRoutes()
            .stream()
            .map(RouteResponse::valueOf)
            .collect(Collectors.toList());
        return new PathResponse(routeResponses, path.getDistance(), path.getTime(),
            path.getWalkTime());
    }

    private static List<RouteResponse> getPathResponses(APIItemListResponse apiItemListResponse) {
        return apiItemListResponse.getPathListAPIResponse()
            .stream()
            .map(RouteResponse::valueOf)
            .collect(Collectors.toList());
    }

    public Path toPath() {
        return new Path(
            routes.stream()
                .map(RouteResponse::toRoute)
                .collect(Collectors.toList()),
            distance, time, 0);
    }

    public List<RouteResponse> getRoutes() {
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
