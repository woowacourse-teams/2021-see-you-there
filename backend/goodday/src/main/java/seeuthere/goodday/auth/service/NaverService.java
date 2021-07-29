package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.TokenResponse;
import seeuthere.goodday.auth.utils.NaverUtil;
import seeuthere.goodday.member.service.MemberService;

@Service
public class NaverService {

    private final MemberService memberService;

    public NaverService(MemberService memberService) {
        this.memberService = memberService;
    }

    public ProfileResponse getProfileWithToken(String code, String state) {
        TokenResponse response = NaverUtil.getAccessToken(code, state);
        String memberId = memberService.createRandomMemberId();
        return NaverUtil.getUserInfo(response.getAccessToken(), memberId);
    }

}
