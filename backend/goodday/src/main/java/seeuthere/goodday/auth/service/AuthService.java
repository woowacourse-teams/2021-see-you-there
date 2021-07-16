package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.ProfileTokenDto;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;

@Service
public class AuthService {

    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    public ProfileTokenDto createToken(ProfileDto profile) {
        String token = jwtTokenProvider.createToken(profile.getId());
        return new ProfileTokenDto(profile, token);
    }
}
