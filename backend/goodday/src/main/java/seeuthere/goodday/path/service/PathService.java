package seeuthere.goodday.path.service;

import java.util.List;
import org.springframework.stereotype.Service;
import seeuthere.goodday.location.config.Requesters;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.PointWithName;
import seeuthere.goodday.path.domain.PathCandidate;
import seeuthere.goodday.path.domain.PathData;
import seeuthere.goodday.path.domain.TransportCache;
import seeuthere.goodday.path.domain.algorithm.Station;
import seeuthere.goodday.path.domain.algorithm.Stations;
import seeuthere.goodday.path.domain.api.Paths;
import seeuthere.goodday.path.domain.requester.TransportRequester;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.repository.TransportRedisRepository;
import seeuthere.goodday.path.util.TransportURL;

@Service
public class PathService {

    private final TransportRequester transportRequester;
    private final Requesters requesters;
    private final TransportRedisRepository transportRedisRepository;

    public PathService(TransportRequester transportRequester, Requesters requesters,
        TransportRedisRepository transportRedisRepository) {
        this.transportRequester = transportRequester;
        this.requesters = requesters;
        this.transportRedisRepository = transportRedisRepository;
    }

    public PathsResponse findBusPath(PointWithName startPointWithName,
        PointWithName endPointWithName) {
        PathsResponse pathsResponse = getPathsResponse(startPointWithName.getPoint(),
            endPointWithName.getPoint(), TransportURL.BUS);
        return getPathsResponseWithWalk(startPointWithName, endPointWithName, pathsResponse);
    }

    private PathsResponse getPathsResponseWithWalk(PointWithName startPointWithName,
        PointWithName endPointWithName, PathsResponse pathsResponse) {
        Paths paths = pathsResponse.toPaths(startPointWithName.getPoint(),
            endPointWithName.getPoint());
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

        TransportCache transportCache = transportRedisRepository.findById(
            redisId(startStation, endStation))
            .orElseGet(() -> saveRedisCachePathsResponse(startStation, endStation));

        Paths paths = transportCache.getPaths();
        PathsResponse pathsResponse = PathsResponse.valueOf(paths);

        return getPathsResponseWithWalk(startPointWithName, endPointWithName, pathsResponse);
    }

//    private APITransportResponse validAPITransportResponse(TransportCache transportCache) {
//        Paths paths = transportCache.getPaths();
//        APITransportResponse apiTransportResponse = transportCache.getApiTransportResponse();
//        if (Objects.isNull(apiTransportResponse)) {
//            apiTransportResponse = new APITransportResponse();
//        }
//        return apiTransportResponse;
//    }

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
        PathsResponse pathsResponse = PathsResponse.valueOf(apiTransportResponse.getMsgBody());
        Paths paths = pathsResponse.toPaths(startStation.getPoint(), endStation.getPoint());
        TransportCache transportCache = new TransportCache(redisId(startStation, endStation),
            paths);
        transportRedisRepository.save(transportCache);
        return transportCache;
    }

    private PathsResponse getPathsResponse(Point start, Point end, TransportURL transportURL) {
        APITransportResponse apiTransportResponse =
            transportRequester.transportPath(start, end, transportURL);
        return PathsResponse.valueOf(apiTransportResponse.getMsgBody());
    }

    private String redisId(Station startStation, Station endStation) {
        return "subway:" + startStation.getPoint() + endStation.getPoint();
    }

    // todo - findPaths로 추상화할지 정하기
    public List<PathData> findSubwayPaths(List<PathCandidate> pathCandidates) {
        return transportRequester.pathsByTransport(pathCandidates, TransportURL.SUBWAY);
    }

    public List<PathData> findBusPaths(List<PathCandidate> pathCandidates) {
        return transportRequester.pathsByTransport(pathCandidates, TransportURL.BUS);
    }
}
