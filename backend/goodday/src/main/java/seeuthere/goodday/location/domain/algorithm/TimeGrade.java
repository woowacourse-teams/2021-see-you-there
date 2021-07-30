package seeuthere.goodday.location.domain.algorithm;

public class TimeGrade {

    private int minTime;
    private int maxTime;
    private int totalTime;

    public TimeGrade() {
        minTime = Integer.MAX_VALUE;
        maxTime = Integer.MIN_VALUE;
        totalTime = 0;
    }

    public void calculateTime(int time) {
        minTime = Math.min(time, minTime);
        maxTime = Math.max(time, maxTime);
        totalTime += time;
    }

    public int diffTime() {
        return maxTime - minTime;
    }

    public int getAvgTime(int size) {
        return totalTime / size;
    }
}
