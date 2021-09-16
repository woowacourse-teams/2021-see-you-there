package seeuthere.goodday.path.dto.api.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;

public class APIItemListResponse implements Serializable {

    @XmlElement(name = "distance")
    private int distance;

    @XmlElement(name = "pathList")
    private final List<APIPathListResponse> APIPathListResponse;

    @XmlElement(name = "time")
    private int time;

    public APIItemListResponse() {
        APIPathListResponse = new ArrayList<>();
    }

    public int getDistance() {
        return distance;
    }

    public List<APIPathListResponse> getPathListAPIResponse() {
        return APIPathListResponse;
    }

    public int getTime() {
        return time;
    }
}
