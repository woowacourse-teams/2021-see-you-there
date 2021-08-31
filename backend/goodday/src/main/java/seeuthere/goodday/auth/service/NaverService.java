package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.config.NaverAuthRequester;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.TokenResponse;
import seeuthere.goodday.member.service.MemberService;

@Service
public class NaverService {

    private final MemberService memberService;
    private final NaverAuthRequester naverAuthRequester;

    public NaverService(MemberService memberService, NaverAuthRequester naverAuthRequester) {
        this.memberService = memberService;
        this.naverAuthRequester = naverAuthRequester;
    }

    public ProfileResponse getProfileWithToken(String code, String state) {
        TokenResponse response = naverAuthRequester.accessToken(code, state);
        String memberId = memberService.createRandomMemberId();
        return naverAuthRequester.userInfo(response.getAccessToken(), memberId);
    }

}
