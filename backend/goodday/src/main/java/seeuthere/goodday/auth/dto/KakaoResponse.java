package seeuthere.goodday.auth.dto;

public class KakaoResponse {

    private long id;
    private KakaoAccount kakaoAccount;

    public KakaoResponse() {
    }

    public KakaoResponse(long id, KakaoAccount kakaoAccount) {
        this.id = id;
        this.kakaoAccount = kakaoAccount;
    }

    public long getId() {
        return id;
    }

    public KakaoAccount getKakaoAccount() {
        return kakaoAccount;
    }
}
