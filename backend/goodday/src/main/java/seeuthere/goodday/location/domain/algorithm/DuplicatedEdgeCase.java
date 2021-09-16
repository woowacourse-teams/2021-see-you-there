package seeuthere.goodday.location.domain.algorithm;

import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public enum DuplicatedEdgeCase {

    SINCHON("신촌역");

    private static Set<String> EDGE_CASE;

    private final String stationName;

    DuplicatedEdgeCase(String stationName) {
        this.stationName = stationName;
    }

    public static Set<String> edgeCase() {
        if (Objects.isNull(EDGE_CASE)) {
            EDGE_CASE = Arrays.stream(DuplicatedEdgeCase.values())
                .map(DuplicatedEdgeCase::getName)
                .collect(Collectors.toSet());
        }
        return EDGE_CASE;
    }

    public static boolean isContain(String name) {
        return edgeCase().contains(name);
    }

    public String getName() {
        return this.stationName;
    }
}
