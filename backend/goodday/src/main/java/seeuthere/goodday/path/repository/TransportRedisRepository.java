package seeuthere.goodday.path.repository;

import org.springframework.data.repository.CrudRepository;
import seeuthere.goodday.path.domain.TransportCache;

public interface TransportRedisRepository extends CrudRepository<TransportCache, String> {

}
