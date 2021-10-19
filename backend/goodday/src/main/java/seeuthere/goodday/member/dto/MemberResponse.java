package seeuthere.goodday.member.dto;

import seeuthere.goodday.member.domain.Member;

public class MemberResponse {

    private String id;
    private String memberId;
    private String nickname;
    private String profileImage;

    public MemberResponse() {
    }

    public MemberResponse(Member member) {
        this(member.getId(), member.getMemberId(), member.getNickname(), member.getProfileImage());
    }

    public MemberResponse(String id, String memberId, String nickname, String profileImage) {
        this.id = id;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;

    }

    public String getId() {
        return id;
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
