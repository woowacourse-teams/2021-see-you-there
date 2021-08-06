package seeuthere.goodday.path.dto.api.response;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;

public class APIMsgBodyResponse {

    @XmlElement(name = "itemList")
    private final List<APIItemListResponse> itemListResponse;

    public APIMsgBodyResponse() {
        itemListResponse = new ArrayList<>();
    }

    public List<APIItemListResponse> getItemListAPIResponses() {
        return itemListResponse;
    }
}
