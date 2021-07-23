package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.ProfileTokenResponse;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.service.MemberService;

@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    public AuthService(JwtTokenProvider jwtTokenProvider, MemberService memberService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
    }

    public ProfileTokenResponse createToken(ProfileResponse profile) {
        String token = jwtTokenProvider.createToken(profile.getId());
        return new ProfileTokenResponse(profile, token);
    }

    public void validate(String token) {
        String id = jwtTokenProvider.extractId(token);
        memberService.find(id);
    }

    public String findMemberIdByToken(String token) {
        return jwtTokenProvider.extractId(token);
    }
}
