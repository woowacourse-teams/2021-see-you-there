package seeuthere.goodday.location.domain.algorithm;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.dto.response.UtilityResponse;

public class StationGrades {

    private final TreeMap<StationGrade, UtilityResponse> grades;

    public StationGrades(TreeMap<StationGrade, UtilityResponse> grades) {
        this.grades = grades;
    }

    public static StationGrades valueOf(Points points,
        List<UtilityResponse> utilityResponses, Map<Point, Map<Point, PathResult>> map) {

        TreeMap<StationGrade, UtilityResponse> grades = new TreeMap<>();

        for (UtilityResponse utilityResponse : utilityResponses) {
            calculateTimeGrade(points, map, grades, utilityResponse);
        }

        return new StationGrades(grades);
    }

    private static void calculateTimeGrade(Points points, Map<Point, Map<Point, PathResult>> map,
        TreeMap<StationGrade, UtilityResponse> grades, UtilityResponse utilityResponse) {

        TimeGrade timeGrade = new TimeGrade();

        for (Point sourcePoint : points.getPointRegistry()) {
            Point targetPoint = new Point(utilityResponse.getX(), utilityResponse.getY());
            PathResult pathResult = map.get(sourcePoint).get(targetPoint);
            timeGrade.calculateTime(pathResult.getTime());
        }

        grades.put(new StationGrade(timeGrade.diffTime(),
            timeGrade.getAvgTime(points.size())), utilityResponse);
    }

    public void add(StationGrade stationGrade, UtilityResponse utilityResponse) {
        grades.put(stationGrade, utilityResponse);
    }

    public UtilityResponse finalUtilityResponse() {
        return grades.firstEntry().getValue();
    }
}
