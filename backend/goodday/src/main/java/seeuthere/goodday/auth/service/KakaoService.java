package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.config.KakaoAuthRequester;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.member.service.MemberService;

@Service
public class KakaoService {

    private final MemberService memberService;
    private final KakaoAuthRequester kakaoAuthRequester;

    public KakaoService(MemberService memberService, KakaoAuthRequester kakaoAuthRequester) {
        this.memberService = memberService;
        this.kakaoAuthRequester = kakaoAuthRequester;
    }

    public ProfileResponse getProfileWithToken(String code) {
        String accessToken = kakaoAuthRequester.kakaoAccessToken(code);
        String memberId = memberService.createRandomMemberId();
        return kakaoAuthRequester.kakaoUserInfo(accessToken, memberId);
    }

    public String getDomainUrl() {
        return kakaoAuthRequester.getDomainUrl();
    }
}
