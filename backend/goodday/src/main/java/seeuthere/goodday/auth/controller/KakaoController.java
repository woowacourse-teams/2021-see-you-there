package seeuthere.goodday.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.ProfileTokenResponse;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.auth.service.KakaoService;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.secret.SecretKey;

@Controller
@RequestMapping("/api/kakao")
public class KakaoController {

    private static final String KAKAO_AUTH_URI = "https://kauth.kakao.com";

    private final MemberService memberService;
    private final AuthService authService;
    private final KakaoService kakaoService;

    public KakaoController(MemberService memberService, AuthService authService,
        KakaoService kaKaoService) {
        this.memberService = memberService;
        this.authService = authService;
        this.kakaoService = kaKaoService;
    }

    @GetMapping(value = "/oauth")
    public String kakaoConnect() {
        return String.join("",
            "redirect:",
            KAKAO_AUTH_URI,
            "/oauth/authorize?client_id=",
            SecretKey.KAKAO_API_KEY,
            "&redirect_uri=",
            kakaoService.getDomainUrl(),
            "/kakao/callback&response_type=code");
    }

    @RequestMapping(value = "/callback", produces = "application/json", method = {RequestMethod.GET,
        RequestMethod.POST})
    public ResponseEntity<ProfileTokenResponse> kakaoLogin(@RequestParam("code") String code) {
        ProfileResponse profile = kakaoService.getProfileWithToken(code);

        return ResponseEntity.ok().body(authService.createToken(memberService.add(profile)));
    }
}
