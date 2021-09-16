package seeuthere.goodday.location.dto.api.response;

import java.util.List;

public class APIUtilityResponse {

    private Meta meta;
    private List<APIUtilityDocument> documents;

    @Override
    public String toString() {
        return "APIUtilityResponse{" +
            "documents=" + documents +
            '}';
    }

    public List<APIUtilityDocument> getDocuments() {
        return documents;
    }

    public Meta getMeta() {
        return meta;
    }
}
