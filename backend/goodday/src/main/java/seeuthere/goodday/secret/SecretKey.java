package seeuthere.goodday.secret;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("SecretKey")
public class SecretKey {

    @Value("${security.kakao.apikey}")
    private String kakaoApiKey;
    @Value("${security.jwt.token.secret-key}")
    private String jwtSecretKey;
    @Value("${security.jwt.token.expire-length}")
    private Integer jwtValidityTime;
    @Value("${security.transport.apikey}")
    private String transportApiKey;

    private SecretKey() {
    }

    public String getKakaoApiKey() {
        return kakaoApiKey;
    }

    public String getJwtSecretKey() {
        return jwtSecretKey;
    }

    public Integer getJwtValidityTime() {
        return jwtValidityTime;
    }

    public String getTransportApiKey() {
        return transportApiKey;
    }
}
