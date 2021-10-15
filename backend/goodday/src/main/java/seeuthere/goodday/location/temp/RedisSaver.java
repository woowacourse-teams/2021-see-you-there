package seeuthere.goodday.location.temp;

import org.springframework.data.repository.CrudRepository;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.TransportCache;

@FunctionalInterface
public interface RedisSaver {

    void save(PathCandidate pathCandidate, CrudRepository<TransportCache, String> crudRepository, Paths paths);
}
