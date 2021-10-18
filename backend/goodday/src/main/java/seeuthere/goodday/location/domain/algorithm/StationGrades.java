package seeuthere.goodday.location.domain.algorithm;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import seeuthere.goodday.location.domain.StationPoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.path.domain.api.Path;

public class StationGrades {

    private final TreeMap<StationGrade, StationPoint> grades;

    public StationGrades(TreeMap<StationGrade, StationPoint> grades) {
        this.grades = grades;
    }

    public static StationGrades valueOf(Points points,
        List<StationPoint> candidateDestination, Map<Point, Map<Point, Path>> map) {
        // todo - 자료구조 교체하기
        TreeMap<StationGrade, StationPoint> grades = new TreeMap<>();

        for (StationPoint stationPoint : candidateDestination) {
            calculateTimeGrade(points, map, grades, stationPoint);
        }

        return new StationGrades(grades);
    }

//    public static StationGrades valueOf(Points points,
//        List<UtilityResponse> utilityResponses, Map<Point, Map<Point, PathResult>> map) {
//
//        TreeMap<StationGrade, UtilityResponse> grades = new TreeMap<>();
//
//        for (UtilityResponse utilityResponse : utilityResponses) {
//            calculateTimeGrade(points, map, grades, utilityResponse);
//        }
//
//        return new StationGrades(grades);
//    }

    private static void calculateTimeGrade(Points points, Map<Point, Map<Point, Path>> map,
        TreeMap<StationGrade, StationPoint> grades, StationPoint stationPoint) {

        TimeGrade timeGrade = new TimeGrade();

        for (Point sourcePoint : points.getPointRegistry()) {
            Point targetPoint = stationPoint.getPoint();
            Path path = map.get(targetPoint).get(sourcePoint);
            timeGrade.calculateTime(path.getTime());
        }

        grades.put(new StationGrade(timeGrade.diffTime(),
            timeGrade.getAvgTime(points.size())), stationPoint);
    }

//    private static void calculateTimeGrade(Points points, Map<Point, Map<Point, PathResult>> map,
//        TreeMap<StationGrade, UtilityResponse> grades, UtilityResponse utilityResponse) {
//
//        TimeGrade timeGrade = new TimeGrade();
//
//        for (Point sourcePoint : points.getPointRegistry()) {
//            Point targetPoint = new Point(utilityResponse.getX(), utilityResponse.getY());
//            PathResult pathResult = map.get(sourcePoint).get(targetPoint);
//            timeGrade.calculateTime(pathResult.getTime());
//        }
//
//        grades.put(new StationGrade(timeGrade.diffTime(),
//            timeGrade.getAvgTime(points.size())), utilityResponse);
//    }

//    public void add(StationGrade stationGrade, UtilityResponse utilityResponse) {
//        grades.put(stationGrade, utilityResponse);
//    }

    public void add(StationGrade stationGrade, StationPoint stationPoint) {
        grades.put(stationGrade, stationPoint);
    }

//    public UtilityResponse finalUtilityResponse() {
//        return grades.firstEntry().getValue();
//    }

    public StationPoint findStationPoint() {
        return grades.firstEntry().getValue();
    }
}
