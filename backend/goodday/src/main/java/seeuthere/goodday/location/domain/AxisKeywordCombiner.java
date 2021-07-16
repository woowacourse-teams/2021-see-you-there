package seeuthere.goodday.location.domain;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.dto.AxisDocument;
import seeuthere.goodday.location.dto.UtilityDocument;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public class AxisKeywordCombiner {

    private final List<Location> locations;

    public AxisKeywordCombiner(List<Location> locations) {
        this.locations = locations;
    }

    public List<Location> getLocations() {
        return new ArrayList<>(locations);
    }

    public static AxisKeywordCombiner valueOf(List<AxisDocument> axisDocuments,
        List<UtilityDocument> utilityDocuments) {
        List<Location> locations = new ArrayList<>();
        isNull(axisDocuments, utilityDocuments);
        axisProcess(locations, axisDocuments);
        utilityProcess(locations, utilityDocuments);
        return new AxisKeywordCombiner(locations);
    }

    private static void axisProcess(List<Location> locations, List<AxisDocument> axisDocuments) {
        for (AxisDocument axisDocument : axisDocuments) {
            locations.add(
                new Location.Builder()
                    .x(axisDocument.getX())
                    .y(axisDocument.getY())
                    .address(axisDocument.getAddress())
                    .roadAddress(axisDocument.getRoadAddress())
                    .name(validAddress(axisDocument))
                    .build()
            );
        }
    }

    private static void utilityProcess(List<Location> locations,
        List<UtilityDocument> utilityDocuments) {
        for (UtilityDocument utilityDocument : utilityDocuments) {
            locations.add(
                new Location.Builder()
                    .x(utilityDocument.getX())
                    .y(utilityDocument.getY())
                    .address(utilityDocument.getAddressName())
                    .roadAddress(utilityDocument.getRoadAddressName())
                    .name(utilityDocument.getPlaceName())
                    .build()
            );
        }
    }

    private static void isNull(List<AxisDocument> axisDocuments,
        List<UtilityDocument> utilityDocuments) {
        if (Objects.isNull(axisDocuments) && Objects.isNull(utilityDocuments)) {
            throw new GoodDayException(LocationExceptionSet.INVALID_LOCATION);
        }
    }

    private static String validAddress(AxisDocument axisDocument) {
        if (Objects.nonNull(axisDocument.getAddress())) {
            return axisDocument.getAddress().getAddressName();
        }
        return axisDocument.getRoadAddress().getAddressName();
    }
}
