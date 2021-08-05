package seeuthere.goodday.redis;

import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash("point")
public class Point implements Serializable {

    @Id
    private String id;
    private Long amount;
    private LocalDateTime refreshTime;
    public Point(String id, Long amount, LocalDateTime refreshTime) {
        this.id = id;
        this.amount = amount;
        this.refreshTime = refreshTime;
    }

    public void refresh(long amount, LocalDateTime refreshTime){
        if(refreshTime.isAfter(this.refreshTime)){ // 저장된 데이터보다 최신 데이터일 경우
            this.amount = amount;
            this.refreshTime = refreshTime;
        }
    }

    public String getId() {
        return id;
    }

    public Long getAmount() {
        return amount;
    }

    public LocalDateTime getRefreshTime() {
        return refreshTime;
    }
}
