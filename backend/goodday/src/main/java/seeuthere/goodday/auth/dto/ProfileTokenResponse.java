package seeuthere.goodday.auth.dto;

import seeuthere.goodday.member.domain.Member;

public class ProfileTokenResponse {

    private final String id;
    private final String memberId;
    private final String nickname;
    private final String profileImage;
    private final String token;
    private final boolean adminInfo;

    public ProfileTokenResponse(Member member, String token, boolean adminInfo) {
        this.id = member.getId();
        this.memberId = member.getMemberId();
        this.nickname = member.getNickname();
        this.profileImage = member.getProfileImage();
        this.token = token;
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

    public String getToken() {
        return token;
    }

    public boolean isAdminInfo() {
        return adminInfo;
    }
}
