package seeuthere.goodday.path.domain;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import javax.persistence.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import seeuthere.goodday.path.domain.api.Paths;
import seeuthere.goodday.path.dto.response.PathsRedisDto;

@RedisHash("TransportCache")
public class TransportCache implements Serializable {

    @Id
    private String id;
    private PathsRedisDto pathsRedisDto;

    @TimeToLive(unit = TimeUnit.DAYS)
    private Long timeToLive;

    public TransportCache() {
        timeToLive = 90L;
    }

    public TransportCache(String id, PathsRedisDto pathsRedisDto) {
        this.id = id;
        this.pathsRedisDto = pathsRedisDto;
        timeToLive = 90L;
    }

    public TransportCache(String id, Paths paths) {
        this(id, new PathsRedisDto(paths));
    }

    public String getId() {
        return id;
    }

    public PathsRedisDto getPathsRedisDto() {
        return pathsRedisDto;
    }

    public Paths getPaths() {
        return pathsRedisDto.valueOf();
    }
}
