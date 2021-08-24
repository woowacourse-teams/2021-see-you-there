package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.config.AuthRequesters;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.member.service.MemberService;

@Service
public class KaKaoService {

    private final MemberService memberService;
    private final AuthRequesters requesters;

    public KaKaoService(MemberService memberService, AuthRequesters requesters) {
        this.memberService = memberService;
        this.requesters = requesters;
    }

    public ProfileResponse getProfileWithToken(String code) {
        String accessToken = requesters.kakaoAccessToken(code);
        String memberId = memberService.createRandomMemberId();
        return requesters.kakaoUserInfo(accessToken, memberId);
    }
}
