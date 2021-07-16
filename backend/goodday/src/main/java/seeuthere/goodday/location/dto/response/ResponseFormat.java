package seeuthere.goodday.location.dto.response;

import java.util.List;

public class ResponseFormat<T> {

    private final List<T> data;

    public ResponseFormat(List<T> data) {
        this.data = data;
    }

    public List<T> getData() {
        return data;
    }
}
