package seeuthere.goodday.location.dto;

import java.util.List;

public class LocationResponse {

    private Meta meta;
    private List<Document> documents;

    public LocationResponse() {
    }

    public List<Document> getDocuments() {
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
