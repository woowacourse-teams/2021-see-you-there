package seeuthere.goodday.location.domain.combiner;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.domain.location.Location;
import seeuthere.goodday.location.dto.api.response.APIAxisDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.component.Address;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class AxisKeywordCombiner {

    private final List<Location> locations;

    public AxisKeywordCombiner(List<Location> locations) {
        this.locations = locations;
    }

    public static AxisKeywordCombiner valueOf(List<APIAxisDocument> apiAxisDocuments,
        List<APIUtilityDocument> utilityDocuments) {
        List<Location> locations = new ArrayList<>();
        isNull(apiAxisDocuments, utilityDocuments);
        axisProcess(locations, apiAxisDocuments);
        utilityProcess(locations, utilityDocuments);
        return new AxisKeywordCombiner(locations);
    }

    private static void axisProcess(List<Location> locations,
        List<APIAxisDocument> apiAxisDocuments) {
        for (APIAxisDocument apiAxisDocument : apiAxisDocuments) {

            locations.add(
                new Location.Builder()
                    .x(apiAxisDocument.getX())
                    .y(apiAxisDocument.getY())
                    .address(translatedAddress(apiAxisDocument.getAddress()))
                    .roadAddress(translatedAddress(apiAxisDocument.getRoadAddress()))
                    .name(validAddress(apiAxisDocument))
                    .build()
            );
        }
    }

    private static void utilityProcess(List<Location> locations,
        List<APIUtilityDocument> apiUtilityDocuments) {
        for (APIUtilityDocument utilityDocument : apiUtilityDocuments) {
            locations.add(
                new Location.Builder()
                    .x(utilityDocument.getX())
                    .y(utilityDocument.getY())
                    .address(utilityDocument.getAddressName())
                    .roadAddress(utilityDocument.getRoadAddressName())
                    .placeUrl(utilityDocument.getPlaceUrl())
                    .name(utilityDocument.getPlaceName())
                    .build()
            );
        }
    }

    private static void isNull(List<APIAxisDocument> apiAxisDocuments,
        List<APIUtilityDocument> apiUtilityDocuments) {
        if (Objects.isNull(apiAxisDocuments) && Objects.isNull(apiUtilityDocuments)) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private static String validAddress(APIAxisDocument apiAxisDocument) {
        if (Objects.nonNull(apiAxisDocument.getAddress())) {
            return apiAxisDocument.getAddress().getAddressName();
        }
        return apiAxisDocument.getRoadAddress().getAddressName();
    }

    private static String translatedAddress(Address address) {
        if (Objects.isNull(address)) {
            return "";
        }
        return address.getAddressName();
    }

    public List<Location> getLocations() {
        return new ArrayList<>(locations);
    }
}
