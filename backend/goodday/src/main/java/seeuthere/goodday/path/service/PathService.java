package seeuthere.goodday.path.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.requester.UtilityRequester;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.algorithm.Station;
import seeuthere.goodday.path.domain.algorithm.Stations;
import seeuthere.goodday.path.domain.requester.TransportRequester;
import seeuthere.goodday.path.dto.api.response.APITransportResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.util.TransportURL;

@Service
public class PathService {

    private final TransportRequester transportRequester;
    private final UtilityRequester utilityRequester;

    public PathService(TransportRequester transportRequester,
        UtilityRequester utilityRequester) {
        this.transportRequester = transportRequester;
        this.utilityRequester = utilityRequester;
    }

    public PathsResponse findBusPath(Point start, Point end) {
        PathsResponse pathsResponse = getPathsResponse(start, end, TransportURL.BUS);
        return getPathsResponseWithWalk(start, end, pathsResponse);
    }

    public PathsResponse findSubwayPath(Point start, Point end) {
        Station startStation = Stations.of(utilityRequester, start).getNearestStation();
        Station endStation = Stations.of(utilityRequester, end).getNearestStation();
        PathsResponse pathsResponse = getPathsResponse(startStation.getPoint(),
            endStation.getPoint(), TransportURL.SUBWAY);
        return getPathsResponseWithWalk(start, end, pathsResponse);
    }

    private PathsResponse getPathsResponseWithWalk(Point start, Point end,
        PathsResponse pathsResponse) {
        Paths paths = pathsResponse.toPaths();
        Paths walkWithPaths = paths.pathsWithWalk(start, end);
        walkWithPaths.sort();
        return PathsResponse.valueOf(walkWithPaths);
    }

    public PathsResponse findTransferPath(Point start, Point end) {
        PathsResponse pathsResponse = getPathsResponse(start, end, TransportURL.BUS_AND_SUBWAY);
        return getPathsResponseWithWalk(start, end, pathsResponse);
    }

    private PathsResponse getPathsResponse(Point start, Point end,
        TransportURL transportURL) {
        APITransportResponse apiTransportResponse =
            transportRequester.transportPath(start, end, transportURL);
        return PathsResponse.valueOf(apiTransportResponse.getMsgBody());
    }
}
