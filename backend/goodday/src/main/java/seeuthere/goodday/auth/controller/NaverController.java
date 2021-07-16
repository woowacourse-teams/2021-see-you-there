package seeuthere.goodday.auth.controller;

import static seeuthere.goodday.auth.domain.Naver.NAVER_AUTH_URI;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import seeuthere.goodday.auth.domain.Naver;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.ProfileTokenDto;
import seeuthere.goodday.auth.dto.TokenDto;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.secret.SecretKey;

@Controller
@RequestMapping("/api/naver")
public class NaverController {

    private final MemberService memberService;
    private final AuthService authService;

    public NaverController(MemberService memberService, AuthService authService) {
        this.memberService = memberService;
        this.authService = authService;
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
    public ResponseEntity<ProfileTokenDto> naverLogin(@RequestParam(value = "code") String code,
        @RequestParam(value = "state") String state) {
        TokenDto response = Naver.getAccessToken(code, state);

        ProfileDto profile = Naver.getUserInfo(response.getAccess_token());
        memberService.add(profile);
        ProfileTokenDto profileTokenDto = authService.createToken(profile);
        return ResponseEntity.ok().body(profileTokenDto);
    }
}
