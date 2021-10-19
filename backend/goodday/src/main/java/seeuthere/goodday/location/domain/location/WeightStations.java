package seeuthere.goodday.location.domain.location;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class WeightStations {

    private final Map<String, Point> stations;

    public WeightStations() {
        this(new HashMap<>());
    }

    public WeightStations(Map<String, Point> stations) {
        this.stations = stations;
    }

    public void add(String station, Point point) {
        stations.put(station, point);
    }

    public boolean contains(String station) {
        return stations.containsKey(station);
    }

    public Point get(String station) {
        return stations.get(station);
    }

    public Set<String> getKeys() {
        return stations.keySet();
    }
}
