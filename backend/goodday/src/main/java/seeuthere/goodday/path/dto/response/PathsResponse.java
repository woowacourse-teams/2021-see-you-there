package seeuthere.goodday.path.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.dto.api.response.APIMsgBodyResponse;

public class PathsResponse {

    private final List<PathResponse> paths;

    public PathsResponse(List<PathResponse> paths) {
        this.paths = paths;
    }

    public static PathsResponse valueOf(Paths paths) {
        return new PathsResponse(
            paths.getPathRegistry()
                .stream()
                .map(PathResponse::valueOf)
                .collect(Collectors.toList())
        );
    }

    public static PathsResponse valueOf(APIMsgBodyResponse apiMsgBodyResponse) {
        return new PathsResponse(
            apiMsgBodyResponse.getItemListResponse()
                .stream()
                .map(PathResponse::valueOf)
                .collect(Collectors.toList())
        );
    }

    public Paths toPaths(Point startPoint, Point endPoint) {
        return new Paths(paths.stream()
            .map(PathResponse::toPath)
            .collect(Collectors.toList())
            ,startPoint
            ,endPoint
        );
    }

    public List<PathResponse> getPaths() {
        return paths;
    }
}
