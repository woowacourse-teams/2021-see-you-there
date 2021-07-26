package seeuthere.goodday.member.dto;

import seeuthere.goodday.member.domain.Member;

public class MemberResponse {

    private final String id;
    private final String memberId;
    private final String name;
    private final String profileImage;

    public MemberResponse(Member member) {
        this(member.getId(), member.getMemberId(), member.getName(), member.getProfileImage());
    }

    public MemberResponse(String id, String name, String profileImage, String memberId) {
        this.id = id;
        this.name = name;
        this.profileImage = profileImage;
        this.memberId = memberId;
    }

    public String getId() {
        return id;
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
