package seeuthere.goodday.member.dto;

import seeuthere.goodday.member.domain.RequestFriend;

public class RequestFriendResponse {

    private Long id;
    private MemberResponse requester;
    private MemberResponse receiver;

    public RequestFriendResponse() {

    }

    public RequestFriendResponse(RequestFriend requester) {
        this.id = requester.getId();
        this.requester = new MemberResponse(requester.getRequester());
        this.receiver = new MemberResponse(requester.getReceiver());
    }

    public Long getId() {
        return id;
    }

    public MemberResponse getRequester() {
        return requester;
    }

    public MemberResponse getReceiver() {
        return receiver;
    }
}
