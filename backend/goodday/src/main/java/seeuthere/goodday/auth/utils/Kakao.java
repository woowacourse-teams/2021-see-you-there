package seeuthere.goodday.auth.utils;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.secret.SecretKey;

public class Kakao {

    public static final String KAKAO_HOST_URI = "https://kapi.kakao.com";
    public static final String KAKAO_AUTH_URI = "https://kauth.kakao.com";
    public static final String DOMAIN_URI = "https://seeyouthere.o-r.kr";

    public static ProfileDto getKakaoUserInfo(String access_token) {
        WebClient webClient = WebClient.builder()
            .baseUrl(KAKAO_HOST_URI)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        JSONObject response = webClient.post()
            .uri(uriBuilder -> uriBuilder.path("/v2/user/me").build())
            .header("Authorization", "Bearer " + access_token)
            .retrieve().bodyToMono(JSONObject.class).block();
        return convertToProfileDto(response);
    }

    private static ProfileDto convertToProfileDto(JSONObject response) {
        String id = String.valueOf(response.get("id"));
        Map<String, Object> kakaoAccount = (LinkedHashMap<String, Object>) response
            .get("kakao_account");
        Map<String, Object> profile = (LinkedHashMap<String, Object>) kakaoAccount.get("profile");
        String nickName = (String) profile.get("nickname");
        String profileImage = (String) profile.get("thumbnail_image_url");

        return new ProfileDto(id, nickName, profileImage);
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
            .retrieve().bodyToMono(JSONObject.class).block();
        return extractTokens(Objects.requireNonNull(response));
    }

    private static String extractTokens(JSONObject responseBody) {
        return (String) responseBody.get("access_token");
    }
}
