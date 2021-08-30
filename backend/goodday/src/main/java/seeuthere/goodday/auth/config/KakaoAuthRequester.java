package seeuthere.goodday.auth.config;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Objects;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.secret.SecretKey;

public class KakaoAuthRequester {

    private final WebClient kakaoHostWebClient;
    private final WebClient kakaoAuthWebClient;

    private static String domainUrl;

    public KakaoAuthRequester(WebClient kakaoHostWebClient, WebClient kakaoAuthWebClient) {
        this.kakaoHostWebClient = kakaoHostWebClient;
        this.kakaoAuthWebClient = kakaoAuthWebClient;
    }

    @Value("${url.server}")
    public void setKey(String value) {
        domainUrl = value;
    }

    public ProfileResponse kakaoUserInfo(String accessToken, String memberId) {
        JSONObject response = kakaoAuthWebClient.post()
            .uri(uriBuilder -> uriBuilder.path("/v2/user/me").build())
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .bodyToFlux(JSONObject.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_USER_INFO));
        return convertToProfileDto(response, memberId);
    }

    private ProfileResponse convertToProfileDto(JSONObject response, String memberId) {
        String id = String.valueOf(response.get("id"));
        Map<String, Object> kakaoAccount = (LinkedHashMap<String, Object>) response
            .get("kakao_account");
        Map<String, Object> profile = (LinkedHashMap<String, Object>) kakaoAccount.get("profile");
        String nickName = (String) profile.get("nickname");
        String profileImage = (String) profile.get("thumbnail_image_url");

        return new ProfileResponse(id, memberId, nickName, profileImage);
    }

    public String kakaoAccessToken(String code) {
        JSONObject response = kakaoHostWebClient.post()
            .uri(uriBuilder -> uriBuilder
                .path("/oauth/token")
                .queryParam("grant_type", "authorization_code")
                .queryParam("client_id", SecretKey.KAKAO_API_KEY)
                .queryParam("redirect_uri", domainUrl + "/kakao/callback")
                .queryParam("code", code)
                .build())
            .retrieve()
            .bodyToFlux(JSONObject.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_CALLBACK));
        return extractTokens(Objects.requireNonNull(response));
    }

    private String extractTokens(JSONObject responseBody) {
        return (String) responseBody.get("access_token");
    }

    public static String getDomainUrl() {
        return domainUrl;
    }
}
