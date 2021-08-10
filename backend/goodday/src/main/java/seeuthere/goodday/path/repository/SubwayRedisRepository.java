package seeuthere.goodday.path.repository;

import org.springframework.data.repository.CrudRepository;
import seeuthere.goodday.path.service.TransportCache;

public interface SubwayRedisRepository extends CrudRepository<TransportCache, String> {

}
