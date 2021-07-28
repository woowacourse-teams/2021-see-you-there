package seeuthere.goodday.member.dto;

public class FriendRequest {

    private String memberId;

    public FriendRequest() {

    }

    public FriendRequest(String memberId) {
        this.memberId = memberId;
    }

    public String getMemberId() {
        return memberId;
    }
}
