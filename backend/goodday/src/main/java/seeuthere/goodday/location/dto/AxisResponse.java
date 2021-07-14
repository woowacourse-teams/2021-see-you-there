package seeuthere.goodday.location.dto;

import java.util.List;

public class AxisResponse {

    private Meta meta;
    private List<AxisDocument> documents;

    public AxisResponse() {
    }

    public List<AxisDocument> getDocuments() {
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
