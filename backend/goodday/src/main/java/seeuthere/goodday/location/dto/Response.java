package seeuthere.goodday.location.dto;

import java.util.List;

public class Response<T> {

    List<T> data;

    public Response(List<T> data) {
        this.data = data;
    }

    public List<T> getData() {
        return data;
    }
}
