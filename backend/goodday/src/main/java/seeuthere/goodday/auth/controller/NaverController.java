package seeuthere.goodday.auth.controller;

import static seeuthere.goodday.auth.utils.NaverUtil.NAVER_AUTH_URI;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import seeuthere.goodday.auth.config.NaverAuthRequester;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.ProfileTokenResponse;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.auth.service.NaverService;
import seeuthere.goodday.auth.utils.NaverUtil;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.secret.SecretKey;

@Controller
@RequestMapping("/api/naver")
public class NaverController {

    private final MemberService memberService;
    private final AuthService authService;
    private final NaverService naverService;

    public NaverController(MemberService memberService, AuthService authService,
        NaverService naverService) {
        this.memberService = memberService;
        this.authService = authService;
        this.naverService = naverService;
    }

    @GetMapping("/oauth")
    public String naverConnect() {
        String state = NaverUtil.generateState();
        StringBuilder url = new StringBuilder("redirect:");
        url.append(NAVER_AUTH_URI)
            .append("/oauth2.0/authorize?client_id=")
            .append(SecretKey.NAVER_API_KEY)
            .append("&response_type=code&redirect_uri=")
            .append(NaverAuthRequester.NAVER_AUTH_URI)
            .append("/api/naver/callback&state=")
            .append(state);

        return url.toString();
    }

    @RequestMapping(value = "/callback", method = {RequestMethod.GET,
        RequestMethod.POST}, produces = "application/json")
    public ResponseEntity<ProfileTokenResponse> naverLogin(
        @RequestParam(value = "code") String code,
        @RequestParam(value = "state") String state) {
        ProfileResponse profile = naverService.getProfileWithToken(code, state);
        return ResponseEntity.ok().body(authService.createToken(memberService.add(profile)));
    }
}
