package seeuthere.goodday.path.service;

import java.util.Objects;
import org.springframework.stereotype.Service;
import seeuthere.goodday.location.config.Requesters;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.PointWithName;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.domain.algorithm.Station;
import seeuthere.goodday.path.domain.algorithm.Stations;
import seeuthere.goodday.path.domain.requester.TransportRequester;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.repository.SubwayRedisRepository;
import seeuthere.goodday.path.util.TransportURL;

@Service
public class PathService {

    private final TransportRequester transportRequester;
    private final Requesters requesters;
    private final SubwayRedisRepository subwayRedisRepository;

    public PathService(TransportRequester transportRequester, Requesters requesters,
        SubwayRedisRepository subwayRedisRepository) {
        this.transportRequester = transportRequester;
        this.requesters = requesters;
        this.subwayRedisRepository = subwayRedisRepository;
    }

    public PathsResponse findBusPath(PointWithName startPointWithName,
        PointWithName endPointWithName) {
        PathsResponse pathsResponse = getPathsResponse(startPointWithName.getPoint(),
            endPointWithName.getPoint(), TransportURL.BUS);
        return getPathsResponseWithWalk(startPointWithName, endPointWithName, pathsResponse);
    }

    private PathsResponse getPathsResponseWithWalk(PointWithName startPointWithName,
        PointWithName endPointWithName, PathsResponse pathsResponse) {
        Paths paths = pathsResponse.toPaths();
        Paths walkWithPaths = paths.pathsWithWalk(startPointWithName, endPointWithName);
        walkWithPaths.sort();
        return PathsResponse.valueOf(walkWithPaths);
    }

    public PathsResponse findSubwayPath(PointWithName startPointWithName,
        PointWithName endPointWithName) {
        Station startStation = Stations.of(requesters.utility(), startPointWithName.getPoint())
            .getNearestStation();
        Station endStation = Stations.of(requesters.utility(), endPointWithName.getPoint())
            .getNearestStation();

        TransportCache transportCache = subwayRedisRepository.findById(
                redisId(startStation, endStation))
            .orElseGet(() -> saveRedisCachePathsResponse(startStation, endStation));

        APITransportResponse apiTransportResponse = validAPITransportResponse(transportCache);
        PathsResponse pathsResponse = PathsResponse.valueOf(apiTransportResponse.getMsgBody());

        return getPathsResponseWithWalk(startPointWithName, endPointWithName, pathsResponse);
    }

    private APITransportResponse validAPITransportResponse(TransportCache transportCache) {
        APITransportResponse apiTransportResponse = transportCache.getApiTransportResponse();
        if (Objects.isNull(apiTransportResponse)) {
            apiTransportResponse = new APITransportResponse();
        }
        return apiTransportResponse;
    }

    public PathsResponse findTransferPath(PointWithName startPointWithName,
        PointWithName endPointWithName) {
        PathsResponse pathsResponse = getPathsResponse(
            startPointWithName.getPoint(),
            endPointWithName.getPoint(),
            TransportURL.BUS_AND_SUBWAY
        );
        return getPathsResponseWithWalk(startPointWithName, endPointWithName, pathsResponse);
    }

    private TransportCache saveRedisCachePathsResponse(Station startStation, Station endStation) {
        APITransportResponse apiTransportResponse = transportRequester.transportPath(
            startStation.getPoint(),
            endStation.getPoint(),
            TransportURL.SUBWAY);
        TransportCache transportCache = new TransportCache(redisId(startStation, endStation),
            apiTransportResponse);
        subwayRedisRepository.save(transportCache);
        return transportCache;
    }

    private PathsResponse getPathsResponse(Point start, Point end, TransportURL transportURL) {
        APITransportResponse apiTransportResponse =
            transportRequester.transportPath(start, end, transportURL);
        return PathsResponse.valueOf(apiTransportResponse.getMsgBody());
    }

    private String redisId(Station startStation, Station endStation) {
        return "subway:" + startStation + endStation;
    }
}
