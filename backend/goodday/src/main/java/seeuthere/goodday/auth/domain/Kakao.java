package seeuthere.goodday.auth.domain;

import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.secret.SecretKey;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;

public class Kakao {

    public static final String KAKAO_HOST_URI = "https://kapi.kakao.com";
    public static final String KAKAO_AUTH_URI = "https://kauth.kakao.com";
    // 도메인~~~
    public static final String DOMAIN_URI = "http://localhost:8080";

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
        Map<String, Object> kakaoAccount = (LinkedHashMap<String, Object>) response.get("kakao_account");
        Map<String, Object> profile = (LinkedHashMap<String, Object>) kakaoAccount.get("profile");
        String nickName = (String) profile.get("nickname");
        String profileImage = (String) profile.get("thumbnail_image_url");

        return new ProfileDto(id, nickName, profileImage);
    }

    public static Map<String, String> getKakaoAccessToken(String code) {
        WebClient webClient = WebClient.builder()
                .baseUrl(KAKAO_AUTH_URI)
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        JSONObject response = webClient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth/token")
                        .queryParam("grant_type", "authorization_code")
                        .queryParam("client_id", SecretKey.KAKAO_API_KEY)
                        .queryParam("redirect_uri", Kakao.DOMAIN_URI + "/api/kakao/callback")
                        .queryParam("code", code)
                        .build())
                .retrieve().bodyToMono(JSONObject.class).block();
        return extractTokens(Objects.requireNonNull(response));
    }

    private static HashMap<String, String> extractTokens(JSONObject responseBody) {
        HashMap<String, String> tokens = new HashMap<>();

        String accessToken = (String) responseBody.get("access_token");
        String refreshToken = (String) responseBody.get("refresh_token");

        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);
        return tokens;
    }
}
