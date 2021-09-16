package seeuthere.goodday.path.domain;

import java.io.Serializable;
import java.util.concurrent.TimeUnit;
import javax.persistence.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.TimeToLive;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;

@RedisHash("TransportCache")
public class TransportCache implements Serializable {

    @Id
    private String id;
    private APITransportResponse apiTransportResponse;

    @TimeToLive(unit = TimeUnit.DAYS)
    private final Long timeToLive;

    public TransportCache() {
        timeToLive = 7L;
    }

    public TransportCache(String id, APITransportResponse apiTransportResponse) {
        this.id = id;
        this.apiTransportResponse = apiTransportResponse;
        timeToLive = 7L;
    }

    public String getId() {
        return id;
    }

    public APITransportResponse getApiTransportResponse() {
        return apiTransportResponse;
    }
}
