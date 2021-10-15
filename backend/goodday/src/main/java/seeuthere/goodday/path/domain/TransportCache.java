package seeuthere.goodday.path.domain;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import javax.persistence.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsRedisDto;

@RedisHash("TransportCache")
public class TransportCache implements Serializable {

    @Id
    private String id;
    private PathsRedisDto pathsRedisDto;

    @TimeToLive(unit = TimeUnit.DAYS)
    private Long timeToLive;

    public TransportCache() {
        timeToLive = 7L;
    }

    public TransportCache(String id, PathsRedisDto pathsRedisDto) {
        this.id = id;
        this.pathsRedisDto = pathsRedisDto;
        timeToLive = 7L;
    }

    public TransportCache(String id, Paths paths) {
        this.id = id;
        this.pathsRedisDto = new PathsRedisDto(paths);
        timeToLive = 7L;
    }

    public String getId() {
        return id;
    }

    public Paths getPaths() {
        return pathsRedisDto.valueOf();
    }
}
