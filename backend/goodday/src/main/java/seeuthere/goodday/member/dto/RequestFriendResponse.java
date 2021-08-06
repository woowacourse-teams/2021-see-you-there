package seeuthere.goodday.member.dto;

import java.util.List;
import seeuthere.goodday.member.domain.RequestFriend;

public class RequestFriendResponse {

    private Long id;
    private MemberResponse requester;

    public RequestFriendResponse() {

    }

    public RequestFriendResponse(RequestFriend requester) {
        this.id = requester.getId();
        this.requester = new MemberResponse(requester.getRequester());
    }

    public Long getId() {
        return id;
    }

    public MemberResponse getRequester() {
        return requester;
    }
}
