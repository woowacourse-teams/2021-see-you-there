package seeuthere.goodday.auth.dto;

public class ProfileResponse {

    private String id;
    private String memberId;
    private String nickname;
    private String profileImage;
    private boolean adminInfo;

    public ProfileResponse() {

    }

    public ProfileResponse(String id, String memberId, String nickname, String profileImage) {
        this(id, memberId, nickname, profileImage, false);
    }

    public ProfileResponse(String id, String memberId, String nickname, String profileImage, boolean adminInfo) {
        this.id = id;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.adminInfo = adminInfo;
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

    public boolean isAdminInfo() {
        return adminInfo;
    }
}
