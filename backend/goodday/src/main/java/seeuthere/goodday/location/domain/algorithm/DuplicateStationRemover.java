package seeuthere.goodday.location.domain.algorithm;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import seeuthere.goodday.location.temp.StationPoint;

public class DuplicateStationRemover {

    private static final String DELIMITER = " ";

    private final List<StationPoint> stationPoints;

    public DuplicateStationRemover(
        List<StationPoint> stationPoints) {
        this.stationPoints = stationPoints;
    }

    public List<StationPoint> result() {
        List<StationPoint> utilityResponses = new ArrayList<>();
        Set<String> stations = new HashSet<>();
        for (StationPoint stationPoint : stationPoints) {
            insertValidStation(utilityResponses, stations, stationPoint);
        }
        return utilityResponses;
    }

    private void insertValidStation(List<StationPoint> utilityResponses, Set<String> stations,
        StationPoint stationPoint) {
        String name = translatedStationName(stationPoint.getKey());

        if (!stations.contains(name)) {
            stations.add(name);
            utilityResponses.add(stationPoint);
        }
    }

    private String translatedStationName(String placeName) {
        String name = placeName.split(DELIMITER)[0];
        if (DuplicatedEdgeCase.isContain(name)) {
            return placeName;
        }
        return name;
    }
}
