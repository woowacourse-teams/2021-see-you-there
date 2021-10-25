package seeuthere.goodday.location.domain.algorithm;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import seeuthere.goodday.location.domain.StationGradePoint;
import seeuthere.goodday.location.domain.StationPoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.path.domain.api.Path;

public class StationGrades {

    private final List<StationGradePoint> stationGradePoints;

    public StationGrades(List<StationGradePoint> stationGradePoints) {
        this.stationGradePoints = stationGradePoints;
    }

    public static StationGrades valueOf(Points points,
        List<StationPoint> candidateDestination,
        Map<Point, Map<Point, Path>> pathFromSourceToTarget) {
        List<StationGradePoint> stationGradePoints = new ArrayList<>();

        for (StationPoint stationPoint : candidateDestination) {
            calculateTimeGrade(points, pathFromSourceToTarget, stationGradePoints, stationPoint);
        }
        Collections.sort(stationGradePoints);
        return new StationGrades(stationGradePoints);
    }

    private static void calculateTimeGrade(Points points,
        Map<Point, Map<Point, Path>> pathFromSourceToTarget,
        List<StationGradePoint> stationGradePoints, StationPoint stationPoint) {

        TimeGrade timeGrade = new TimeGrade();

        for (Point sourcePoint : points.getPointRegistry()) {
            Point targetPoint = stationPoint.getPoint();
            Path path = pathFromSourceToTarget.get(targetPoint).get(sourcePoint);
            if (Objects.isNull(path)) {
                return;
            }
            timeGrade.calculateTime(path.getTime());
        }
        stationGradePoints.add(new StationGradePoint(new StationGrade(timeGrade.diffTime(),
            timeGrade.getAvgTime(points.size())), stationPoint));
    }

    public StationPoint findStationPoint() {
        return stationGradePoints.get(0).getStationPoint();
    }
}
