package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.utils.KakaoUtil;
import seeuthere.goodday.member.service.MemberService;

@Service
public class KaKaoService {

    private final MemberService memberService;

    public KaKaoService(MemberService memberService) {
        this.memberService = memberService;
    }

    public ProfileResponse getProfileWithToken(String code) {
        String accessToken = KakaoUtil.getKakaoAccessToken(code);
        String memberId = memberService.createRandomMemberId();
        return KakaoUtil.getKakaoUserInfo(accessToken, memberId);
    }
}
