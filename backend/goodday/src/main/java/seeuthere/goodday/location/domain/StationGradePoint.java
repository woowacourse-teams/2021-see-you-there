package seeuthere.goodday.location.domain;

import java.util.Objects;
import seeuthere.goodday.location.domain.algorithm.StationGrade;

public class StationGradePoint implements Comparable<StationGradePoint> {

    private final StationGrade stationGrade;
    private final StationPoint stationPoint;

    public StationGradePoint(StationGrade stationGrade, StationPoint stationPoint) {
        this.stationGrade = stationGrade;
        this.stationPoint = stationPoint;
    }

    public StationPoint getStationPoint() {
        return stationPoint;
    }

    @Override
    public int compareTo(StationGradePoint stationGradePoint) {
        return stationGrade.compareTo(stationGradePoint.stationGrade);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StationGradePoint that = (StationGradePoint) o;
        return Objects.equals(stationGrade, that.stationGrade) && Objects
            .equals(getStationPoint(), that.getStationPoint());
    }

    @Override
    public int hashCode() {
        return Objects.hash(stationGrade, getStationPoint());
    }
}
