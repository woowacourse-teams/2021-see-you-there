package seeuthere.goodday.path.dto.api.response;

import java.util.List;
import javax.xml.bind.annotation.XmlElement;

public class APIMsgBodyResponse {

    @XmlElement(name = "itemList")
    List<APIItemListResponse> itemListRespons;

    public APIMsgBodyResponse() {

    }

    public List<APIItemListResponse> getItemListAPIResponses() {
        return itemListRespons;
    }
}
