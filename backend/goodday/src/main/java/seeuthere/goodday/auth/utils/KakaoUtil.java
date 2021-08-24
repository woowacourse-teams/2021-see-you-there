package seeuthere.goodday.auth.utils;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.secret.SecretKey;

@Component
public class KakaoUtil {

    public static final String KAKAO_HOST_URI = "https://kapi.kakao.com";
    public static final String KAKAO_AUTH_URI = "https://kauth.kakao.com";

    public static String DOMAIN_URI;

    @Value("${url.kakao}")
    public void setKey(String value) {
        DOMAIN_URI = value;
    }

    public static ProfileResponse getKakaoUserInfo(String accessToken, String memberId) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_HOST_URI)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        JSONObject response = webClient.post()
            .uri(uriBuilder -> uriBuilder.path("/v2/user/me").build())
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .bodyToFlux(JSONObject.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_USER_INFO));
        return convertToProfileDto(response, memberId);
    }

    private static ProfileResponse convertToProfileDto(JSONObject response, String memberId) {
        String id = String.valueOf(response.get("id"));
        Map<String, Object> kakaoAccount = (LinkedHashMap<String, Object>) response
            .get("kakao_account");
        Map<String, Object> profile = (LinkedHashMap<String, Object>) kakaoAccount.get("profile");
        String nickName = (String) profile.get("nickname");
        String profileImage = (String) profile.get("thumbnail_image_url");

        return new ProfileResponse(id, memberId, nickName, profileImage);
    }

    public static String getKakaoAccessToken(String code) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_AUTH_URI)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        JSONObject response = webClient.post()
            .uri(uriBuilder -> uriBuilder
                .path("/oauth/token")
                .queryParam("grant_type", "authorization_code")
                .queryParam("client_id", SecretKey.KAKAO_API_KEY)
                .queryParam("redirect_uri", DOMAIN_URI + "/kakao/callback")
                .queryParam("code", code)
                .build())
            .retrieve()
            .bodyToFlux(JSONObject.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_CALLBACK));
        return extractTokens(Objects.requireNonNull(response));
    }

    private static String extractTokens(JSONObject responseBody) {
        return (String) responseBody.get("access_token");
    }
}
