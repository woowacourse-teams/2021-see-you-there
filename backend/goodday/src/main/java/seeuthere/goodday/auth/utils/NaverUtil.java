package seeuthere.goodday.auth.utils;


import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.LinkedHashMap;
import java.util.Map;
import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.TokenResponse;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.secret.SecretKey;

public class NaverUtil {

    public static String NAVER_HOST_URI = "https://openapi.naver.com";
    public static String NAVER_AUTH_URI = "https://nid.naver.com";

    private NaverUtil() {
    }

    public static String generateState() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

    public static ProfileResponse getUserInfo(String accessToken, String memberId) {
        WebClient webclient = WebClient.builder()
            .baseUrl(NAVER_HOST_URI)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        JSONObject response = webclient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/v1/nid/me")
                .build())
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .bodyToFlux(JSONObject.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.NAVER_USER_INFO));
        return convertToProfileDto(response, memberId);
    }

    private static ProfileResponse convertToProfileDto(JSONObject response, String memberId) {
        Map<String, Object> res = (LinkedHashMap<String, Object>) response.get("response");

        String id = (String) res.get("id");
        String nickName = (String) res.get("nickname");
        String profileImage = (String) res.get("profile_image");

        return new ProfileResponse(id, memberId, nickName, profileImage);
    }

    public static TokenResponse getAccessToken(String code, String state) {
        WebClient webclient = WebClient.builder()
            .baseUrl(NAVER_AUTH_URI)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        return webclient.post()
            .uri(uriBuilder -> uriBuilder
                .path("/oauth2.0/token")
                .queryParam("client_id", SecretKey.NAVER_API_KEY)
                .queryParam("client_secret", SecretKey.NAVER_CLIENT_SECRET)
                .queryParam("grant_type", "authorization_code")
                .queryParam("state", state)
                .queryParam("code", code)
                .build())
            .retrieve()
            .bodyToFlux(TokenResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_CALLBACK));
    }
}
