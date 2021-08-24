package seeuthere.goodday.auth.dto;

import seeuthere.goodday.member.domain.Member;

public class ProfileTokenResponse {

    private String id;
    private String memberId;
    private String nickname;
    private String profileImage;
    private String token;

    public ProfileTokenResponse() {
    }

    public ProfileTokenResponse(Member member, String token) {
        this.id = member.getId();
        this.memberId = member.getMemberId();
        this.nickname = member.getNickname();
        this.profileImage = member.getProfileImage();
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
