package seeuthere.goodday.location.repository;

import org.springframework.data.repository.CrudRepository;
import seeuthere.goodday.location.domain.algorithm.PathResult;

public interface PathResultRedisRepository extends CrudRepository<PathResult, String> {

}
