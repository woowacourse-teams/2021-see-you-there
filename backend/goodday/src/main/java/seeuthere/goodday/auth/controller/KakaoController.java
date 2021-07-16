package seeuthere.goodday.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.domain.Kakao;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.secret.SecretKey;

import javax.servlet.http.HttpSession;
import java.util.Map;

import static seeuthere.goodday.auth.domain.Kakao.KAKAO_AUTH_URI;
import static seeuthere.goodday.auth.domain.Kakao.KAKAO_HOST_URI;


@Controller
@RequestMapping("/api/kakao")
public class KakaoController {

    private final MemberService memberService;

    public KakaoController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping(value = "/oauth")
    public String kakaoConnect() {
        StringBuffer url = new StringBuffer();
        url.append(KAKAO_AUTH_URI + "/oauth/authorize?");
        url.append("client_id=" + SecretKey.KAKAO_API_KEY);
        url.append("&redirect_uri=" + Kakao.DOMAIN_URI + "/api/kakao/callback");
        url.append("&response_type=code");

        return "redirect:" + url;
    }

    @RequestMapping(value = "/callback", produces = "application/json", method = {RequestMethod.GET,
            RequestMethod.POST})
    public ResponseEntity<ProfileDto> kakaoLogin(@RequestParam("code") String code, HttpSession session) {
        Map<String, String> tokens = Kakao.getKakaoAccessToken(code);
        session.setAttribute("access_token", tokens.get("access_token"));
        ProfileDto profile = Kakao.getKakaoUserInfo(tokens.get("access_token"));
        memberService.add(profile);
        return ResponseEntity.ok().body(profile);
    }

    @GetMapping(value = "/logout")
    public String kakaoLogout(HttpSession session) {
        String accessToken = (String) session.getAttribute("access_token");
        WebClient webClient = WebClient.builder()
                .baseUrl(KAKAO_HOST_URI + "/v1/user/logout")
                .build();

        webClient.post()
                .header("Authorization", "Bearer " + accessToken)
                .retrieve()
                .bodyToMono(String.class).block();

        session.removeAttribute("access_token");
        session.removeAttribute("refresh_token");
        return "redirect:/";
    }
}
