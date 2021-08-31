package seeuthere.goodday.member.domain;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class RequestFriend {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "REQUESTER_ID")
    private Member requester;

    @ManyToOne
    @JoinColumn(name = "RECEIVER_ID")
    private Member receiver;

    public RequestFriend() {
    }

    private RequestFriend(Long id, Member requester, Member receiver) {
        this.id = id;
        this.requester = requester;
        this.receiver = receiver;
    }

    public RequestFriend(Member requester, Member receiver) {
        this(null, requester, receiver);
    }

    public Long getId() {
        return id;
    }

    public Member getRequester() {
        return requester;
    }

    public Member getReceiver() {
        return receiver;
    }
}
