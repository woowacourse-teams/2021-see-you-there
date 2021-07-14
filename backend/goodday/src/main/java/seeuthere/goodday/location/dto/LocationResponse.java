package seeuthere.goodday.location.dto;

import java.util.List;

public class LocationResponse {

    Meta meta;
    List<Document> documents;

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
