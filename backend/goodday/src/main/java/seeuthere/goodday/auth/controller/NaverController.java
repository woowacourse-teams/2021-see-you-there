package seeuthere.goodday.auth.controller;

import static seeuthere.goodday.auth.domain.Naver.NAVER_AUTH_URI;

import javax.servlet.http.HttpSession;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.domain.Naver;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.TokenDto;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.secret.SecretKey;

@Controller
@RequestMapping("/api/naver")
public class NaverController {

    private final MemberService memberService;

    public NaverController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/oauth")
    public String naverConnect() {
        String state = Naver.generateState();

        StringBuffer url = new StringBuffer();
        url.append(NAVER_AUTH_URI + "/oauth2.0/authorize?");
        url.append("client_id=" + SecretKey.NAVER_API_KEY);
        url.append("&response_type=code");
        url.append("&redirect_uri=http://localhost:8080/api/naver/callback");
        url.append("&state=" + state);

        return "redirect:" + url;
    }

    @RequestMapping(value = "/callback", method = {RequestMethod.GET,
        RequestMethod.POST}, produces = "application/json")
    public ResponseEntity<ProfileDto> naverLogin(@RequestParam(value = "code") String code,
        @RequestParam(value = "state") String state,
        HttpSession session) {
        TokenDto response = Naver.getAccessToken(code, state);

        session.setAttribute("access_token", response.getAccess_token());
        ProfileDto profile = Naver.getUserInfo(response.getAccess_token());
        memberService.add(profile);
        return ResponseEntity.ok().body(profile);
    }

    @GetMapping("/logout")
    public String naverLogout(HttpSession session) {
        String accessToken = (String) session.getAttribute("access_token");
        WebClient webclient = WebClient.builder()
            .baseUrl(NAVER_AUTH_URI)
            .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
            .build();

        webclient.get()
            .uri(uriBuilder -> uriBuilder
                .path("/oauth2.0/token")
                .queryParam("client_id", SecretKey.NAVER_API_KEY)
                .queryParam("client_secret", SecretKey.NAVER_CLIENT_SECRET)
                .queryParam("grant_type", "delete")
                .queryParam("access_token", accessToken)
                .queryParam("service_provider", "NAVER")
                .build())
            .retrieve().bodyToMono(String.class).block();

        return "redirect:/";
    }
}
