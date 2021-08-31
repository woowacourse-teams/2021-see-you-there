package seeuthere.goodday.auth.dto;

public class KakaoProfile {

    private String nickname;
    private String thumbnailImageUrl;

    public KakaoProfile() {
    }

    public KakaoProfile(String nickName, String thumbnailImageUrl) {
        this.nickname = nickName;
        this.thumbnailImageUrl = thumbnailImageUrl;
    }

    public String getNickname() {
        return nickname;
    }

    public String getThumbnailImageUrl() {
        return thumbnailImageUrl;
    }
}
