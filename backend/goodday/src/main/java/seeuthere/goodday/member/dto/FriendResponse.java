package seeuthere.goodday.member.dto;

import java.util.List;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;

public class FriendResponse {

    private String memberId;
    private String nickname;
    private String profileImage;
    private List<Address> addresses;

    public FriendResponse() {
    }

    public FriendResponse(Member friend) {
        this(friend.getMemberId(), friend.getNickname(), friend.getProfileImage(),
            friend.getAddresses());
    }

    public FriendResponse(String memberId, String nickname, String profileImage,
        List<Address> addresses) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
        this.addresses = addresses;
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

    public List<Address> getAddresses() {
        return addresses;
    }
}
