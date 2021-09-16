package seeuthere.goodday.location.domain.algorithm;

import java.util.Arrays;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

public enum DuplicatedEdgeCase {
    SINCHON("신촌역");

    private static Set<String> edgeCase;

    private final String stationName;

    DuplicatedEdgeCase(String stationName) {
        this.stationName = stationName;
    }

    public static Set<String> edgeCase() {
        if (Objects.isNull(edgeCase)) {
            edgeCase = Arrays.stream(DuplicatedEdgeCase.values())
                .map(DuplicatedEdgeCase::getName)
                .collect(Collectors.toSet());
        }
        return edgeCase;
    }

    public static boolean isContain(String name) {
        return edgeCase().contains(name);
    }

    public String getName() {
        return this.stationName;
    }
}
