package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.dto.TokenResponse;
import seeuthere.goodday.auth.utils.NaverUtil;

@Service
public class NaverService {

    public ProfileResponse getProfileWithToken(String code, String state) {
        TokenResponse response = NaverUtil.getAccessToken(code, state);
        return NaverUtil.getUserInfo(response.getAccessToken());
    }

}
