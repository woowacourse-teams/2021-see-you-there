package seeuthere.goodday.auth.dto;

public class KakaoAccount {

    private KakaoProfile profile;

    public KakaoAccount() {
    }

    public KakaoAccount(KakaoProfile profile) {
        this.profile = profile;
    }

    public KakaoProfile getProfile() {
        return profile;
    }
}
