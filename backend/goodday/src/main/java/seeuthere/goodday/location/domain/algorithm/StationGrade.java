package seeuthere.goodday.location.domain.algorithm;

import java.util.Objects;

public class StationGrade implements Comparable<StationGrade> {

    private final double interval;
    private final double averageTime;

    public StationGrade(double interval, double averageTime) {
        this.interval = interval;
        this.averageTime = averageTime;
    }

    @Override
    public int compareTo(StationGrade o) {
        if (this.averageTime < o.averageTime) {
            return -1;
        }

        if (this.averageTime == o.averageTime) {
            return compareIntervalTime(o);
        }

        return 1;
    }

    private int compareIntervalTime(StationGrade o) {
        if (this.interval < o.interval) {
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
        return interval == that.interval && averageTime == that.averageTime;
    }

    @Override
    public int hashCode() {
        return Objects.hash(interval, averageTime);
    }

    public double getInterval() {
        return interval;
    }

    public double getAverageTime() {
        return averageTime;
    }
}
