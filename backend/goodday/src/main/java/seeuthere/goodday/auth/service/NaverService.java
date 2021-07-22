package seeuthere.goodday.auth.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.dto.TokenDto;
import seeuthere.goodday.auth.utils.NaverUtil;

@Service
public class NaverService {

    public ProfileDto getProfileWithToken(String code, String state) {
        TokenDto response = NaverUtil.getAccessToken(code, state);
        return NaverUtil.getUserInfo(response.getAccessToken());
    }

}
