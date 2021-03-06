package seeuthere.goodday.path.domain.algorithm;

import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.requester.UtilityRequester;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.util.LocationCategory;
import seeuthere.goodday.path.exception.PathExceptionSet;

public class Stations {

    private final List<Station> stationRegistry;

    public Stations(List<Station> stationRegistry) {
        validate(stationRegistry);

        this.stationRegistry = stationRegistry;
    }

    public static Stations of(UtilityRequester utilityRequester, Point point) {
        List<Station> stations = utilityRequester
            .requestUtility(LocationCategory.SW8.getCode(), point.getX(), point.getY())
            .stream()
            .map(APIUtilityDocument::toStation)
            .collect(Collectors.toList());

        return new Stations(stations);
    }

    private void validate(List<Station> stations) {
        if (stations.isEmpty()) {
            throw new GoodDayException(PathExceptionSet.NOT_FOUND_PATH);
        }
    }

    public Station getNearestStation() {
        return stationRegistry.get(0);
    }
}
