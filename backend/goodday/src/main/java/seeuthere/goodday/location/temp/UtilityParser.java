package seeuthere.goodday.location.temp;

import java.util.List;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.dto.api.response.APIUtilityResponse;

public class UtilityParser {

    private UtilityParser() {}

    public static Point parsePoint(Temp temp) {
        APIUtilityResponse utilityResponse = temp.getUserNearStation().block();
        List<APIUtilityDocument> documents = utilityResponse.getDocuments();
        if (documents.size() == 0) {

        }
        APIUtilityDocument apiUtilityDocument = documents.get(0);
        return new Point(apiUtilityDocument.getX(), apiUtilityDocument.getY());
    }

}
