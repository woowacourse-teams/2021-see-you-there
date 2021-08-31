package seeuthere.goodday.auth.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.auth.dto.AccessTokenResponse;
import seeuthere.goodday.auth.dto.KakaoAccount;
import seeuthere.goodday.auth.dto.KakaoProfile;
import seeuthere.goodday.auth.dto.KakaoResponse;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.secret.SecretKey;

public class KakaoAuthRequester {

    private final WebClient kakaoHostWebClient;
    private final WebClient kakaoAuthWebClient;

    @Value("${url.server}")
    private String domainUrl;

    public KakaoAuthRequester(WebClient kakaoHostWebClient, WebClient kakaoAuthWebClient) {
        this.kakaoHostWebClient = kakaoHostWebClient;
        this.kakaoAuthWebClient = kakaoAuthWebClient;
    }

    public ProfileResponse kakaoUserInfo(String accessToken, String memberId) {
        KakaoResponse kakaoResponse = kakaoHostWebClient.post()
            .uri(uriBuilder -> uriBuilder.path("/v2/user/me").build())
            .header("Authorization", "Bearer " + accessToken)
            .retrieve()
            .bodyToFlux(KakaoResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_USER_INFO));

        KakaoAccount kakaoAccount = kakaoResponse.getKakaoAccount();
        KakaoProfile kakaoProfile = kakaoAccount.getProfile();
        return new ProfileResponse(String.valueOf(kakaoResponse.getId()), memberId,
            kakaoProfile.getNickname(), kakaoProfile.getThumbnailImageUrl());
    }

    public String kakaoAccessToken(String code) {
        AccessTokenResponse response = kakaoAuthWebClient.post()
            .uri(uriBuilder -> uriBuilder
                .path("/oauth/token")
                .queryParam("grant_type", "authorization_code")
                .queryParam("client_id", SecretKey.KAKAO_API_KEY)
                .queryParam("redirect_uri", domainUrl + "/kakao/callback")
                .queryParam("code", code)
                .build())
            .retrieve()
            .bodyToFlux(AccessTokenResponse.class)
            .toStream()
            .findFirst()
            .orElseThrow(() -> new GoodDayException(AuthExceptionSet.KAKAO_CALLBACK));

        return response.getAccessToken();
    }

    public String getDomainUrl() {
        return domainUrl;
    }
}
