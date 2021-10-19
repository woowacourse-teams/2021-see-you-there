package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileTokenResponse;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.domain.Member;

@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public ProfileTokenResponse createToken(Member member, boolean isAdmin) {
        String token = jwtTokenProvider.createToken(member.getId());
        return new ProfileTokenResponse(member, token, isAdmin);
    }

    public String findMemberIdByToken(String token) {
        return jwtTokenProvider.extractId(token);
    }
}
