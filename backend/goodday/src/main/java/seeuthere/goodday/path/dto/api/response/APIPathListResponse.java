package seeuthere.goodday.path.dto.api.response;

import java.util.List;
import javax.xml.bind.annotation.XmlElement;

public class APIPathListResponse {

    @XmlElement(name = "fname")
    private String startName;

    @XmlElement(name = "fx")
    private double startX;

    @XmlElement(name = "fy")
    private double startY;

    @XmlElement(name = "railLinkList")
    private List<String> railLinkList;

    @XmlElement(name = "routeNm")
    private String routeName;

    @XmlElement(name = "tname")
    private String endName;

    @XmlElement(name = "tx")
    private double endX;

    @XmlElement(name = "ty")
    private double endY;

    public APIPathListResponse() {
    }

    public String getStartName() {
        return startName;
    }

    public double getStartX() {
        return startX;
    }

    public double getStartY() {
        return startY;
    }

    public int getStationsNumber() {
        return railLinkList.size();
    }

    public String getRouteName() {
        return routeName;
    }

    public String getEndName() {
        return endName;
    }

    public double getEndX() {
        return endX;
    }

    public double getEndY() {
        return endY;
    }
}
