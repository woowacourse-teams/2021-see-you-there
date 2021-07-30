package seeuthere.goodday.location.domain.algorithm;

import java.util.Objects;

public class StationGrade implements Comparable<StationGrade> {

    private final int interval;
    private final int averageTime;

    public StationGrade(int interval, int averageTime) {
        this.interval = interval;
        this.averageTime = averageTime;
    }

    @Override
    public int compareTo(StationGrade o) {
        if (this.interval < o.interval) {
            return -1;
        }

        if (this.interval == o.interval) {
            return compareAverageTime(o);
        }

        return 1;
    }

    private int compareAverageTime(StationGrade o) {
        if (this.averageTime < o.averageTime) {
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

    public int getInterval() {
        return interval;
    }

    public int getAverageTime() {
        return averageTime;
    }
}
