package seeuthere.goodday.location.domain.algorithm;

public class TimeGrade {

    private double minTime;
    private double maxTime;
    private double totalTime;

    public TimeGrade() {
        minTime = Integer.MAX_VALUE;
        maxTime = Integer.MIN_VALUE;
        totalTime = 0;
    }

    public void calculateTime(double time) {
        minTime = Math.min(time, minTime);
        maxTime = Math.max(time, maxTime);
        totalTime += time;
    }

    public double diffTime() {
        return maxTime - minTime;
    }

    public double getAvgTime(int size) {
        return totalTime / size;
    }
}
