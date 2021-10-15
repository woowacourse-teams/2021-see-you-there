package seeuthere.goodday.location.temp;

import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.dto.response.PathsRedisDto;

public enum RedisSaveSet {
    DEFAULT((pathCandidate, crudRepository, paths) -> {
    }),
    SUBWAY((pathCandidate, crudRepository, paths) -> {
        APIUtilityDocument apiUtilityDocument = pathCandidate.apiUtilityDocument();
        TransportCache transportCache = new TransportCache(
            redisId(apiUtilityDocument, pathCandidate.getDestination().getPoint()),
            new PathsRedisDto(paths));
        crudRepository.save(transportCache);
    });

    private final RedisSaver redisSaver;

    RedisSaveSet(RedisSaver redisSaver) {
        this.redisSaver = redisSaver;
    }

    public RedisSaver getRedisSaver() {
        return redisSaver;
    }

    private static String redisId(APIUtilityDocument apiUtilityDocument, Point targetPoint) {
        return "subway:" + new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY())
            + targetPoint;
    }
}
