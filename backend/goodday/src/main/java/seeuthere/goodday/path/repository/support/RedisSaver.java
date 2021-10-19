package seeuthere.goodday.path.repository.support;

import org.springframework.data.repository.CrudRepository;
import seeuthere.goodday.path.domain.PathCandidate;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.domain.api.Paths;

@FunctionalInterface
public interface RedisSaver {

    void save(PathCandidate pathCandidate, CrudRepository<TransportCache, String> crudRepository,
        Paths paths);
}
