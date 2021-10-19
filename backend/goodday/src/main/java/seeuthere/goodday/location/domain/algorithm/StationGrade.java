package seeuthere.goodday.location.domain.algorithm;

import java.util.Objects;

public class StationGrade implements Comparable<StationGrade> {

    private final double criteria;
    private final double interval;
    private final double averageTime;

    public StationGrade(double interval, double averageTime) {
        this.interval = interval;
        this.averageTime = averageTime;
        this.criteria = interval * 0.3 + averageTime * 0.7;
    }

    @Override
    public int compareTo(StationGrade o) {
        if (this.criteria < o.criteria) {
            return -1;
        }
        return 1;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StationGrade that = (StationGrade) o;
        return interval == that.interval && averageTime == that.averageTime
            && criteria == that.criteria;
    }

    @Override
    public int hashCode() {
        return Objects.hash(interval, averageTime, criteria);
    }

    public double getInterval() {
        return interval;
    }

    public double getAverageTime() {
        return averageTime;
    }
}
