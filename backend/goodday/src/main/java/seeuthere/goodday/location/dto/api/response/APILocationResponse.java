package seeuthere.goodday.location.dto.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class APILocationResponse {

    @JsonProperty("documents")
    private List<APILocationDocument> apiLocationDocuments;

    public APILocationResponse() {
    }

    public List<APILocationDocument> getDocuments() {
        return apiLocationDocuments;
    }

    @Override
    public String toString() {
        return "APILocationResponse{" +
            "apiLocationDocuments=" + apiLocationDocuments +
            '}';
    }
}
