package seeuthere.goodday.member.dto;

public class MemberRequest {

    private String name;
    private String profileImage;
    private String memberId;

    public MemberRequest() {
    }

    public MemberRequest(String name, String profileImage, String memberId) {
        this.name = name;
        this.profileImage = profileImage;
        this.memberId = memberId;
    }

    public String getName() {
        return name;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public String getMemberId() {
        return memberId;
    }
}
