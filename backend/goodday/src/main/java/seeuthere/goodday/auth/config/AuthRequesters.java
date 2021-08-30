package seeuthere.goodday.auth.config;

import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.ProfileResponse;

public class AuthRequesters {

    private final KakaoAuthRequester kakaoAuthRequester;

    public AuthRequesters(WebClient kakaoHostClient, WebClient kakaoAuthClient) {
        this.kakaoAuthRequester = new KakaoAuthRequester(kakaoHostClient, kakaoAuthClient);
    }

    public ProfileResponse kakaoUserInfo(String accessToken, String memberId) {
        return this.kakaoAuthRequester.kakaoUserInfo(accessToken, memberId);
    }

    public String kakaoAccessToken(String code) {
        return this.kakaoAuthRequester.kakaoAccessToken(code);
    }

    public String getDomainUrl() {
        return kakaoAuthRequester.getDomainUrl();
    }
}
