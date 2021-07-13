package seeuthere.goodday.auth.domain;

import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import seeuthere.goodday.secret.SecretKey;

import java.net.URI;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class Kakao {

    public static final String KAKAO_HOST_URI = "https://kapi.kakao.com";
    public static final String KAKAO_AUTH_URI = "https://kauth.kakao.com";
    public static final String DOMAIN_URI = "https://seeyouther.o-r.kr";

    public static JSONObject getKakaoUserInfo(String access_token) {
        RestTemplate restTemplate = new RestTemplate();
        URI uri = URI.create(KAKAO_HOST_URI + "/v2/user/me");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + access_token);
        ResponseEntity<JSONObject> apiResponse = postRequest(restTemplate, uri, null, headers);
        return apiResponse.getBody();
    }

    public static Map<String, String> getKakaoAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        URI uri = URI.create(KAKAO_AUTH_URI + "/oauth/token");

        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.set("grant_type", "authorization_code");
        parameters.set("client_id", SecretKey.KAKAO_API_KEY);
        parameters.set("redirect_uri", Kakao.DOMAIN_URI + "/api/kakao/callback");
        parameters.set("code", code);

        ResponseEntity<JSONObject> apiResponse = postRequest(restTemplate, uri, parameters, null);

        return extractTokens(Objects.requireNonNull(apiResponse.getBody()));
    }

    public static ResponseEntity<JSONObject> postRequest(RestTemplate restTemplate,
                                                         URI uri, MultiValueMap<String, Object> parameters, HttpHeaders headers) {
        HttpEntity<MultiValueMap<String, Object>> restRequest = new HttpEntity<>(parameters,
                headers);
        return restTemplate.postForEntity(uri, restRequest, JSONObject.class);
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
