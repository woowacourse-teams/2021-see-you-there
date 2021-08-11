package seeuthere.goodday.location.dto.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Meta {

    private int pageableCount;
    @JsonProperty("is_end")
    private boolean end;

    public Meta() {
    }

    public int getPageableCount() {
        return pageableCount;
    }

    public boolean isEnd() {
        return end;
    }
}
