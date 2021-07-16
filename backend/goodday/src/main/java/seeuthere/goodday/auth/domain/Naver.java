package seeuthere.goodday.auth.domain;


import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.TokenDto;
import seeuthere.goodday.secret.SecretKey;

import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.LinkedHashMap;
import java.util.Map;

public class Naver {

    public static String NAVER_HOST_URI = "https://openapi.naver.com";
    public static String NAVER_AUTH_URI = "https://nid.naver.com";

    private Naver() {
    }

    public static String generateState() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

    public static TokenDto getAccessToken(String code, String state) {
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
                .retrieve().bodyToMono(TokenDto.class).block();
    }

    public static ProfileDto getUserInfo(String accessToken) {
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
                .bodyToMono(JSONObject.class).block();
        return convertToProfileDto(response);
    }

    private static ProfileDto convertToProfileDto(JSONObject response) {
        Map<String, Object> res = (LinkedHashMap<String, Object>) response.get("response");

        String id = (String) res.get("id");
        String nickName = (String) res.get("nickname");
        String profileImage = (String) res.get("profile_image");

        return new ProfileDto(id, nickName, profileImage);
    }
}
