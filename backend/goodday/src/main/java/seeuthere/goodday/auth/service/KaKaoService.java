package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.utils.KakaoUtil;

@Service
public class KaKaoService {

    public ProfileResponse getProfileWithToken(String code) {
        String accessToken = KakaoUtil.getKakaoAccessToken(code);
        return KakaoUtil.getKakaoUserInfo(accessToken);
    }
}
