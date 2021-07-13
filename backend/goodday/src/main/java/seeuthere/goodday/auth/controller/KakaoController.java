package seeuthere.goodday.auth.controller;

import static seeuthere.goodday.auth.domain.Kakao.KAKAO_AUTH_URI;
import static seeuthere.goodday.auth.domain.Kakao.KAKAO_HOST_URI;

import java.net.URI;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.json.simple.JSONObject;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import seeuthere.goodday.auth.domain.Kakao;
import seeuthere.goodday.secret.SecretKey;


@Controller
@RequestMapping("/api/kakao")
public class KakaoController {

    @GetMapping(value = "/oauth")
    public String kakaoConnect() {
        StringBuffer url = new StringBuffer();
        url.append(KAKAO_AUTH_URI + "/oauth/authorize?");
        url.append("client_id=" + SecretKey.KAKAO_API_KEY);
        url.append("&redirect_uri="+ Kakao.DOMAIN_URI +"/api/kakao/callback");
        url.append("&response_type=code");

        return "redirect:" + url;
    }

    @RequestMapping(value = "/callback", produces = "application/json", method = {RequestMethod.GET,
            RequestMethod.POST})
    public String kakaoLogin(@RequestParam("code") String code, HttpSession session) {
        Map<String, String> tokens = Kakao.getKakaoAccessToken(code);
        session.setAttribute("access_token", tokens.get("access_token"));

        // 사용자 정보 받아오기 - 프론트한테 보낼 정보 협의
        JSONObject access_token = Kakao.getKakaoUserInfo(tokens.get("access_token"));
        return null;
    }

    @GetMapping(value = "/logout")
    public void kakaoLogout(HttpSession session) {
        String accessToken = (String) session.getAttribute("access_token");

        RestTemplate restTemplate = new RestTemplate();
        URI uri = URI.create(KAKAO_HOST_URI + "/v1/user/logout");

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        Kakao.postRequest(restTemplate, uri, null, headers);

        session.removeAttribute("access_token");
    }
}
