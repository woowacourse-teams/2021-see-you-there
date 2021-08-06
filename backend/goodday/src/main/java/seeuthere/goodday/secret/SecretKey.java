package seeuthere.goodday.secret;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component("SecretKey")
public class SecretKey {

    public static String KAKAO_API_KEY;
    public static String NAVER_API_KEY;
    public static String NAVER_CLIENT_SECRET;
    public static String JWT_SECRET_KEY;
    public static Integer JWT_VALIDITY_TIME;
    public static String TRANSPORT_API_KEY;

    private SecretKey () {}

    @Value("${security.kakao.apikey}")
    public void setKakaoApiKey(String kakaoApiKey) {
        KAKAO_API_KEY = kakaoApiKey;
    }

    @Value("${security.naver.apikey}")
    public void setNaverApiKey(String naverApiKey) {
        NAVER_API_KEY = naverApiKey;
    }

    @Value("${security.naver.client}")
    public void setNaverClientSecret(String naverClientSecret) {
        NAVER_CLIENT_SECRET = naverClientSecret;
    }

    @Value("${security.jwt.token.secret-key}")
    public void setJwtSecretKey(String jwtSecretKey) {
        JWT_SECRET_KEY = jwtSecretKey;
    }

    @Value("${security.jwt.token.expire-length}")
    public void setJwtValidityTime(Integer jwtValidityTime) {
        JWT_VALIDITY_TIME = jwtValidityTime;
    }

    @Value("${security.transport.apikey}")
    public void setTransportApiKey(String transportApiKey) {
        TRANSPORT_API_KEY = transportApiKey;
    }
}
