package seeuthere.goodday.path.dto.api.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "ServiceResult")
@JsonIgnoreProperties(ignoreUnknown = true)
public class APITransportResponse {

    @XmlElement(name = "msgBody")
    private APIMsgBodyResponse msgBody;

    public APITransportResponse() {
    }

    public APIMsgBodyResponse getMsgBody() {
        return msgBody;
    }
}