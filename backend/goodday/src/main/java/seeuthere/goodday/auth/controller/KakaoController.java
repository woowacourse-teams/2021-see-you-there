package seeuthere.goodday.auth.controller;

import static seeuthere.goodday.auth.utils.KakaoUtil.KAKAO_AUTH_URI;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.ProfileTokenDto;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.auth.service.KaKaoService;
import seeuthere.goodday.auth.utils.KakaoUtil;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.secret.SecretKey;


@Controller
@RequestMapping("/api/kakao")
public class KakaoController {

    private final MemberService memberService;
    private final AuthService authService;
    private final KaKaoService kakaoService;

    public KakaoController(MemberService memberService, AuthService authService,
        KaKaoService kaKaoService) {
        this.memberService = memberService;
        this.authService = authService;
        this.kakaoService = kaKaoService;
    }

    @GetMapping(value = "/oauth")
    public String kakaoConnect() {
        StringBuffer url = new StringBuffer();
        url.append(KAKAO_AUTH_URI + "/oauth/authorize?");
        url.append("client_id=" + SecretKey.KAKAO_API_KEY);
        url.append("&redirect_uri=" + KakaoUtil.DOMAIN_URI + "/kakao/callback");
        url.append("&response_type=code");

        return "redirect:" + url;
    }

    @RequestMapping(value = "/callback", produces = "application/json", method = {RequestMethod.GET,
        RequestMethod.POST})
    public ResponseEntity<ProfileTokenDto> kakaoLogin(@RequestParam("code") String code) {
        ProfileDto profile = kakaoService.getProfileWithToken(code);
        memberService.add(profile);
         return ResponseEntity.ok().body(authService.createToken(profile));
    }
}
