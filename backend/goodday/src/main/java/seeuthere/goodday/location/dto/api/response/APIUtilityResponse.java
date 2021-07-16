package seeuthere.goodday.location.dto.api.response;

import java.util.List;

public class APIUtilityResponse {

    private List<APIUtilityDocument> documents;

    public APIUtilityResponse() {
    }

    public List<APIUtilityDocument> getDocuments() {
        return documents;
    }

    @Override
    public String toString() {
        return "APIUtilityResponse{" +
            "documents=" + documents +
            '}';
    }
}
