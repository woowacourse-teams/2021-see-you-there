package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.utils.KakaoUtil;

@Service
public class KaKaoService {

    public ProfileDto getProfileWithToken(String code) {
        String accessToken = KakaoUtil.getKakaoAccessToken(code);
        return KakaoUtil.getKakaoUserInfo(accessToken);
    }
}
