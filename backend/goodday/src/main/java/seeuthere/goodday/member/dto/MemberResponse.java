package seeuthere.goodday.member.dto;

import seeuthere.goodday.member.domain.Member;

public class MemberResponse {

    private final String id;
    private final String name;
    private final String profileImage;
    private final String memberId;


    public MemberResponse(Member member) {
        this(member.getId(), member.getName(), member.getProfileImage(), member.getMemberId());
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
