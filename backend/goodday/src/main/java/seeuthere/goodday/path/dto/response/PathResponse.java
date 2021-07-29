package seeuthere.goodday.path.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.path.domain.Path;
import seeuthere.goodday.path.dto.api.response.APIItemListResponse;

public class PathResponse {

    private final List<RouteResponse> routes;
    private final int distance;
    private final int time;

    public PathResponse(List<RouteResponse> routes, int distance, int time) {
        this.routes = routes;
        this.distance = distance;
        this.time = time;
    }

    public static PathResponse valueOf(APIItemListResponse apiItemListResponse) {
        int distance = apiItemListResponse.getDistance();
        int time = apiItemListResponse.getTime();
        List<RouteResponse> pathResponses = getPathResponses(apiItemListResponse);
        return new PathResponse(pathResponses, distance, time);
    }

    public static PathResponse valueOf(Path path) {
        List<RouteResponse> routeResponses = path.getRoutes()
            .stream()
            .map(RouteResponse::valueOf)
            .collect(Collectors.toList());
        return new PathResponse(routeResponses, path.getDistance(), path.getTime());
    }

    public Path toPath() {
        return new Path(
            routes.stream()
                .map(RouteResponse::toRoute)
                .collect(Collectors.toList()),
            distance, time);
    }

    private static List<RouteResponse> getPathResponses(APIItemListResponse apiItemListResponse) {
        return apiItemListResponse.getPathListAPIResponse()
            .stream()
            .map(RouteResponse::valueOf)
            .collect(Collectors.toList());
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
}
