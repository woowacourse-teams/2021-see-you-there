package seeuthere.goodday.auth.controller;

import org.json.simple.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import seeuthere.goodday.secret.SecretKey;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.net.URI;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;


@Controller
@RequestMapping("/kakao")
public class KakaoController {
    @GetMapping(value = "/oauth")
    public String kakaoConnect() {
        StringBuffer url = new StringBuffer();
        url.append("https://kauth.kakao.com/oauth/authorize?");
        url.append("client_id=" + SecretKey.KAKAO_API_KEY);
        url.append("&redirect_uri=http://localhost:8080/kakao/callback");
        url.append("&response_type=code");

        return "redirect:" + url.toString();
    }

    @RequestMapping(value = "/callback", produces = "application/json", method = {RequestMethod.GET, RequestMethod.POST})
    public String kakaoLogin(@RequestParam("code") String code, RedirectAttributes ra, HttpSession session, HttpServletResponse response, Model model) throws IOException {

        System.out.println("kakao code:" + code);
        Map<String, String> tokens = getKakaoAccessToken(code);

        // 사용자 정보 받아오기
        getKakaoUserInfo(tokens.get("access_token"));
        return null;
    }

    private void getKakaoUserInfo(String access_token) {
        RestTemplate restTemplate = new RestTemplate();
        String reqUrl = "/v2/user/me";
        URI uri = URI.create("https://kapi.kakao.com" + reqUrl);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + access_token);

        HttpEntity<MultiValueMap<String, Object>> restRequest = new HttpEntity<>(headers);
        ResponseEntity<JSONObject> apiResponse = restTemplate.postForEntity(uri, restRequest, JSONObject.class);
        JSONObject responseBody = apiResponse.getBody();
        Map<String, Object> map = (Map<String, Object>) responseBody.get("kakao_account");
        System.out.println(map);
    }

    public Map<String, String> getKakaoAccessToken(String code) {
        String accessToken = "";

        // restTemplate을 사용하여 API 호출
        RestTemplate restTemplate = new RestTemplate();
        String reqUrl = "/oauth/token";
        URI uri = URI.create("https://kauth.kakao.com" + reqUrl);

        HttpHeaders headers = new HttpHeaders();

        MultiValueMap<String, Object> parameters = new LinkedMultiValueMap<>();
        parameters.set("grant_type", "authorization_code");
        parameters.set("client_id", SecretKey.KAKAO_API_KEY);
        parameters.set("redirect_uri", "http://localhost:8080/kakao/callback");
        parameters.set("code", code);

        HttpEntity<MultiValueMap<String, Object>> restRequest = new HttpEntity<>(parameters, headers);
        ResponseEntity<JSONObject> apiResponse = restTemplate.postForEntity(uri, restRequest, JSONObject.class);
        JSONObject responseBody = apiResponse.getBody();

        HashMap<String, String> tokens = new HashMap<>();

        accessToken = (String) responseBody.get("access_token");
        String refreshToken = (String) responseBody.get("refresh_token");

        tokens.put("access_token", accessToken);
        tokens.put("refresh_token", refreshToken);

        return tokens;
    }
}
