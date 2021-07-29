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

    List<Station> stations;

    public Stations(List<Station> stations) {
        validate(stations);

        this.stations = stations;
    }

    private void validate(List<Station> stations) {
        if (stations.isEmpty()) {
            throw new GoodDayException(PathExceptionSet.NOT_FOUND_PATH);
        }
    }

    public static Stations of(UtilityRequester utilityRequester, Point point) {
        List<Station> stations = utilityRequester
            .requestUtility(LocationCategory.SW8.getCode(), point.getX(), point.getY())
            .stream()
            .map(APIUtilityDocument::toStation)
            .collect(Collectors.toList());

        return new Stations(stations);
    }

    public Station getNearestStation() {
        return stations.get(0);
    }
}
