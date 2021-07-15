package seeuthere.goodday.location.dto;

import java.util.List;

public class UtilityResponse {

    private Meta meta;
    private List<UtilityDocument> documents;

    public UtilityResponse() {
    }

    public List<UtilityDocument> getDocuments() {
        return documents;
    }

    @Override
    public String toString() {
        return "LocationResponse{" +
            "meta=" + meta +
            ", documents=" + documents +
            '}';
    }
}
