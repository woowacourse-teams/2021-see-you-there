package seeuthere.goodday.location.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import seeuthere.goodday.location.config.Requesters;
import seeuthere.goodday.location.domain.algorithm.DuplicateStationRemover;
import seeuthere.goodday.location.domain.location.MiddlePoint;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.Points;
import seeuthere.goodday.location.domain.location.WeightStations;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.response.UtilityResponse;

public class StationPoints {

    private final List<StationPoint> stationPointRegistry;

    public StationPoints(List<StationPoint> stationPointRegistry) {
        this.stationPointRegistry = stationPointRegistry;
    }

    public static StationPoints valueOf(Points userStartPoints, WeightStations weightStations,
        Requesters requesters) {
        List<StationPoint> stationPointRegistry = findMiddleStations(userStartPoints,
            weightStations, requesters);
        return new StationPoints(stationPointRegistry);
    }

    private static List<StationPoint> findMiddleStations(Points points,
        WeightStations weightStations,
        Requesters requesters) {
        MiddlePoint userMiddlePoint = MiddlePoint.valueOf(points);
        List<StationPoint> stationPoints = new ArrayList<>();

        for (UtilityResponse utilityResponse : findSubway(requesters, userMiddlePoint.getX(),
            userMiddlePoint.getY())) {
            stationPoints
                .add(new StationPoint(utilityResponse.getPlaceName(), utilityResponse.getX(),
                    utilityResponse.getY()));
        }

        Set<String> keys = weightStations.getKeys();
        for (String key : keys) {
            insertWeight(stationPoints, key, weightStations);
        }

        DuplicateStationRemover duplicateStationRemover = new DuplicateStationRemover(
            stationPoints);
        return duplicateStationRemover.result();
    }

    private static void insertWeight(List<StationPoint> candidateDestinations, String key,
        WeightStations weightStations) {
        Point point = weightStations.get(key);
        StationPoint stationPoint = new StationPoint(key, point);
        candidateDestinations.add(stationPoint);
    }

    private static List<UtilityResponse> findSubway(Requesters requesters, double x, double y) {
        List<APIUtilityDocument> apiUtilityDocuments = requesters.utility().requestSubway(x, y);
        return toUtilityResponse(apiUtilityDocuments);
    }

    private static List<UtilityResponse> toUtilityResponse(
        List<APIUtilityDocument> apiUtilityDocuments) {
        return apiUtilityDocuments.stream()
            .map(UtilityResponse::new)
            .collect(Collectors.toList());
    }

    public List<StationPoint> getStationPointRegistry() {
        return stationPointRegistry;
    }
}
