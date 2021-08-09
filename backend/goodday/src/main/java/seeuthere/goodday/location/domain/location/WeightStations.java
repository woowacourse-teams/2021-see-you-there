package seeuthere.goodday.location.domain.location;

import java.util.HashSet;
import java.util.Set;

public class WeightStations {

    private final Set<String> stations;

    public WeightStations() {
        this(new HashSet<>());
    }

    public WeightStations(Set<String> stations) {
        this.stations = stations;
    }

    public void add(String station) {
        stations.add(station);
    }

    public boolean contains(String station) {
        return stations.contains(station);
    }
}
