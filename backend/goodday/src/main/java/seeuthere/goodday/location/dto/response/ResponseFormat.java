package seeuthere.goodday.location.dto.response;

import java.util.List;

public class ResponseFormat<T> {

    List<T> data;

    public ResponseFormat(List<T> data) {
        this.data = data;
    }

    public List<T> getData() {
        return data;
    }
}
