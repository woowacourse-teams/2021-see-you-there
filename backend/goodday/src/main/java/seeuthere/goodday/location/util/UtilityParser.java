package seeuthere.goodday.location.util;

import java.util.List;
import java.util.Objects;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;
import seeuthere.goodday.path.domain.PathCandidate;

public class UtilityParser {

    private UtilityParser() {}

    public static Point parsePoint(PathCandidate pathCandidate) {
        APIUtilityResponse utilityResponse = pathCandidate.getUserNearStation().block();
        List<APIUtilityDocument> documents = Objects.requireNonNull(utilityResponse).getDocuments();
        APIUtilityDocument apiUtilityDocument = documents.get(0);
        return new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY());
    }
}
