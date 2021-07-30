package seeuthere.goodday.auth.dto;

public class ProfileTokenResponse {

    private String id;
    private String memberId;
    private String nickname;
    private String profileImage;
    private String token;

    public ProfileTokenResponse(ProfileResponse profile, String token) {
        this.id = profile.getId();
        this.memberId = profile.getMemberId();
        this.nickname = profile.getNickname();
        this.profileImage = profile.getProfileImage();
        this.token = token;
    }

    public String getId() {
        return id;
    }

    public String getMemberId() {
        return memberId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getToken() {
        return token;
    }
}
