package seeuthere.goodday.auth.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.TokenDto;
import seeuthere.goodday.secret.SecretKey;

import javax.servlet.http.HttpSession;
import java.math.BigInteger;
import java.security.SecureRandom;

@Controller
@RequestMapping("/api/naver")
public class NaverController {

    @GetMapping("/oauth")
    public String naverConnect(HttpSession session) {
        String state = generateState();
        session.setAttribute("oauth_state", state);

        StringBuffer url = new StringBuffer();
        url.append("https://nid.naver.com" + "/oauth2.0/authorize?");
        url.append("client_id=" + SecretKey.NAVER_API_KEY);
        url.append("&response_type=code");
        url.append("&redirect_uri=http://localhost:8080/api/naver/callback");
        url.append("&state=" + state);

        return "redirect:" + url;
    }

    public String generateState() {
        SecureRandom random = new SecureRandom();
        return new BigInteger(130, random).toString(32);
    }

    @RequestMapping(value = "/callback", method = {RequestMethod.GET, RequestMethod.POST}, produces = "application/json")
    public String naverLogin(@RequestParam(value = "code") String code,
                             @RequestParam(value = "state") String state,
                             HttpSession session) {
        WebClient webclient = WebClient.builder()
                .baseUrl("https://nid.naver.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        TokenDto response = webclient.post()
                .uri(uriBuilder -> uriBuilder
                        .path("/oauth2.0/token")
                        .queryParam("client_id", SecretKey.NAVER_API_KEY)
                        .queryParam("client_secret", SecretKey.NAVER_CLIENT_SECRET)
                        .queryParam("grant_type", "authorization_code")
                        .queryParam("state", state)
                        .queryParam("code", code)
                        .build())
                .retrieve().bodyToMono(TokenDto.class).block();

        System.out.println("response.getAccess_token() = " + response.getAccess_token());
        session.setAttribute("access_token", response.getAccess_token());
        session.setAttribute("refresh_token", response.getRefresh_token());

        getUserInfo(response.getAccess_token());
        return null;
    }

    private void getUserInfo(String accessToken) {
        WebClient webclient = WebClient.builder()
                .baseUrl("https://openapi.naver.com")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .build();

        String response = webclient.get()
                .uri(uriBuilder -> uriBuilder
                        .path("/v1/nid/me")
                        .build())
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(String.class).block();
        System.out.println(response);
    }

}
