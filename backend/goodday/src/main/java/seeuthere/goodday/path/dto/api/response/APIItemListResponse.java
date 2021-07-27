package seeuthere.goodday.path.dto.api.response;

import java.util.List;
import javax.xml.bind.annotation.XmlElement;

public class APIItemListResponse {

    @XmlElement(name = "distance")
    private int distance;

    @XmlElement(name = "pathList")
    private List<APIPathListResponse> APIPathListResponse;

    @XmlElement(name = "time")
    private int time;

    public APIItemListResponse() {

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
