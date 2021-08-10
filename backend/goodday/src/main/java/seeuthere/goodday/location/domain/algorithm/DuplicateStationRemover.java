package seeuthere.goodday.location.domain.algorithm;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import seeuthere.goodday.location.dto.response.UtilityResponse;

public class DuplicateStationRemover {

    private final static String DELIMITER = " ";

    private final List<UtilityResponse> utilityResponseList;

    public DuplicateStationRemover(List<UtilityResponse> utilityResponseList) {
        this.utilityResponseList = utilityResponseList;
    }

    public List<UtilityResponse> result() {
        List<UtilityResponse> utilityResponses = new ArrayList<>();
        Set<String> stations = new HashSet<>();
        for (UtilityResponse response : utilityResponseList) {
            insertValidStation(utilityResponses, stations, response);
        }
        return utilityResponses;
    }

    private void insertValidStation(List<UtilityResponse> utilityResponses, Set<String> stations,
        UtilityResponse response) {
        String name = translatedStationName(response.getPlaceName());

        if (!stations.contains(name)) {
            stations.add(name);
            UtilityResponse utilityResponse = createdUtilityResponse(response, name);
            utilityResponses.add(utilityResponse);
        }
    }

    private UtilityResponse createdUtilityResponse(UtilityResponse response, String name) {
        return new UtilityResponse.Builder()
            .x(response.getX())
            .y(response.getY())
            .addressName(response.getAddressName())
            .distance(response.getDistance())
            .roadAddressName(response.getRoadAddressName())
            .placeUrl(response.getPlaceUrl())
            .placeName(name)
            .build();
    }

    public static String translatedStationName(String placeName) {
        String name = placeName.split(DELIMITER)[0];
        if (DuplicatedEdgeCase.isContain(name)) {
            return placeName;
        }
        return name;
    }
}
