package seeuthere.goodday.location.domain.algorithm;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import javax.persistence.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.dto.response.PathResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;

@RedisHash("PathResult")
public class PathResult implements Serializable {

    private static final double DEFAULT_WEIGHT_POINT = 1;
    private static final double WEIGHT_POINT = 0.7;

    @Id
    public String id;
    public double time;
    public double weight;

    @TimeToLive(unit = TimeUnit.DAYS)
    private long timeToLive;

    public PathResult() {
        timeToLive = 7L;
    }

    public PathResult(String id, int time, double weight) {
        this.id = id;
        this.time = time;
        this.weight = weight;
        timeToLive = 7L;
    }

    public static PathResult pathsResponseToPathResult(Point source, Point target,
        PathsResponse pathsResponse, boolean isWeighted) {
        PathResponse pathResponse = pathsResponse.getPaths().get(0);
        double weight = DEFAULT_WEIGHT_POINT;
        if (isWeighted) {
            weight = WEIGHT_POINT;
        }
        return new PathResult(source.toString() + target.toString(),
            pathResponse.getTime(), weight);
    }

    public static PathResult minTimePathResult(PathResult pathResult1, PathResult pathResult2) {
        if (pathResult1.time <= pathResult2.time) {
            return pathResult1;
        }
        return pathResult2;
    }

    public String getId() {
        return id;
    }

    public double getTime() {
        return time * weight;
    }
}
