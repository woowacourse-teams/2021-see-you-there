package seeuthere.goodday.member.domain;

import java.io.Serializable;
import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;

@Entity
public class FriendShip {

    @EmbeddedId
    private Key key = new Key();

    @ManyToOne
    @MapsId("ownerId")
    private Member owner;

    @ManyToOne
    @MapsId("friendId")
    private Member friend;

    protected FriendShip() {

    }

    public FriendShip(Member owner, Member friend) {
        this.owner = owner;
        this.friend = friend;
    }

    public Key getKey() {
        return key;
    }

    public void setKey(Key key) {
        this.key = key;
    }

    public Member getOwner() {
        return owner;
    }

    public void setOwner(Member owner) {
        this.owner = owner;
    }

    public Member getFriend() {
        return friend;
    }

    public void setFriend(Member friend) {
        this.friend = friend;
    }

    @Embeddable
    public static class Key implements Serializable {

        private String ownerId;

        private String friendId;
    }

}
