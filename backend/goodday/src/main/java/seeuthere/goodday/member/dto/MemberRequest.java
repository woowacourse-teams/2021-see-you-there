package seeuthere.goodday.member.dto;

public class MemberRequest {

    private String nickname;
    private String profileImage;
    private String memberId;

    public MemberRequest() {
    }

    public MemberRequest(String nickname, String profileImage, String memberId) {
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.memberId = memberId;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getMemberId() {
        return memberId;
    }
}
