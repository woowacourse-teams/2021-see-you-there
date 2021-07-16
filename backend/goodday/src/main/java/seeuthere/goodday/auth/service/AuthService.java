package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.ProfileTokenDto;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.service.MemberService;

@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    public AuthService(JwtTokenProvider jwtTokenProvider, MemberService memberService) {
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
    }

    public ProfileTokenDto createToken(ProfileDto profile) {
        String token = jwtTokenProvider.createToken(profile.getId());
        return new ProfileTokenDto(profile, token);
    }

    public void validate(String token) {
        String id = jwtTokenProvider.extractId(token);
        if (memberService.find(id).isEmpty()) {
            throw new GoodDayException(AuthExceptionSet.NOT_FOUND_USER);
        }
    }
}
