package seeuthere.goodday.path.dto.api.response;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlElement;

public class APIMsgBodyResponse implements Serializable {

    @XmlElement(name = "itemList")
    private List<APIItemListResponse> itemListResponse;

    public APIMsgBodyResponse() {
        itemListResponse = new ArrayList<>();
    }

    public List<APIItemListResponse> getItemListResponse() {
        return itemListResponse;
    }
}
