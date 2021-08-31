package seeuthere.goodday.auth.dto;

public class ProfileResponse {

    private final String id;
    private final String memberId;
    private final String nickname;
    private final String profileImage;

    public ProfileResponse(String id, String memberId, String nickname, String profileImage) {
        this.id = id;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
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
}
