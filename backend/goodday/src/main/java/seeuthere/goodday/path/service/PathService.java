package seeuthere.goodday.path.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.requester.UtilityRequester;
import seeuthere.goodday.path.domain.Paths;
import seeuthere.goodday.path.domain.PointWithName;
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
        Station startStation = Stations.of(utilityRequester, startPointWithName.getPoint())
            .getNearestStation();
        Station endStation = Stations.of(utilityRequester, endPointWithName.getPoint())
            .getNearestStation();
        PathsResponse pathsResponse = getPathsResponse(startStation.getPoint(),
            endStation.getPoint(), TransportURL.SUBWAY);
        return getPathsResponseWithWalk(startPointWithName, endPointWithName, pathsResponse);
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

    private PathsResponse getPathsResponse(Point start, Point end,
        TransportURL transportURL) {
        APITransportResponse apiTransportResponse =
            transportRequester.transportPath(start, end, transportURL);
        return PathsResponse.valueOf(apiTransportResponse.getMsgBody());
    }
}
