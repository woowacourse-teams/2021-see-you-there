package seeuthere.goodday.path.dto.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.Path;
import seeuthere.goodday.path.domain.Paths;

public class PathsRedisDto {

    private List<PathResponse> pathRegistry;
    private PointRedisDto startPoint;
    private PointRedisDto endPoint;

    public PathsRedisDto() {
    }

    public PathsRedisDto(List<PathResponse> pathRegistry, PointRedisDto startPoint,
        PointRedisDto endPoint) {
        this.pathRegistry = pathRegistry;
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    public PathsRedisDto(Paths paths) {
        this.pathRegistry = paths.getPathRegistry().stream()
            .map(PathResponse::valueOf)
            .collect(Collectors.toList());
        this.startPoint = new PointRedisDto(paths.getStartPoint());
        this.endPoint = new PointRedisDto(paths.getEndPoint());
    }

    public Paths valueOf() {
        if (Objects.isNull(pathRegistry)) {
            pathRegistry = new ArrayList<>();
        }
        List <Path> pathRegistry = this.pathRegistry.stream()
            .map(PathResponse::toPath)
            .collect(Collectors.toList());
        Point startOriginalPoint = this.startPoint.toPoint();
        Point endOriginalPoint = this.endPoint.toPoint();
        return new Paths(pathRegistry, startOriginalPoint, endOriginalPoint);
    }
}
