package seeuthere.goodday.location.domain.algorithm;

import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.dto.response.UtilityResponse;
import seeuthere.goodday.path.dto.response.PathResponse;
import seeuthere.goodday.path.dto.response.PathsResponse;

public class StationGrades {

    private final TreeMap<StationGrade, UtilityResponse> grades;

    public StationGrades(TreeMap<StationGrade, UtilityResponse> grades) {
        this.grades = grades;
    }

    public void add(StationGrade stationGrade, UtilityResponse utilityResponse) {
        grades.put(stationGrade, utilityResponse);
    }

    public UtilityResponse finalUtilityResponse() {
        return grades.firstEntry().getValue();
    }

    public static StationGrades valueOf(Points points,
        List<UtilityResponse> utilityResponses, Map<Point, Map<Point, PathsResponse>> map) {

        TreeMap<StationGrade, UtilityResponse> grades = new TreeMap<>();

        for (UtilityResponse utilityResponse : utilityResponses) {
            calculateTimeGrade(points, map, grades, utilityResponse);
        }

        return new StationGrades(grades);
    }

    private static void calculateTimeGrade(Points points, Map<Point, Map<Point, PathsResponse>> map,
        TreeMap<StationGrade, UtilityResponse> grades, UtilityResponse utilityResponse) {

        TimeGrade timeGrade = new TimeGrade();

        for (Point sourcePoint : points.getPoints()) {
            Point targetPoint = new Point(utilityResponse.getX(), utilityResponse.getY());
            PathsResponse pathsResponse = map.get(sourcePoint).get(targetPoint);
            PathResponse pathResponse = pathsResponse.getPaths().get(0);
            timeGrade.calculateTime(pathResponse.getTime());
        }

        grades.put(new StationGrade(timeGrade.diffTime(),
            timeGrade.getAvgTime(points.size())), utilityResponse);
    }
}
