package seeuthere.goodday.location.dto.api.response;

import java.util.List;

public class APIAxisResponse {

    private List<APIAxisDocument> documents;

    public APIAxisResponse() {
    }

    public List<APIAxisDocument> getDocuments() {
        return documents;
    }

    @Override
    public String toString() {
        return "APIAxisResponse{" +
            "documents=" + documents +
            '}';
    }
}
