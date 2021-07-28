package seeuthere.goodday.member.dto;

import java.util.List;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;

public class FriendResponse {

    private final String memberId;
    private final String name;
    private final String profileImage;
    private final List<Address> addresses;

    public FriendResponse(Member friend) {
        this(friend.getMemberId(), friend.getName(), friend.getProfileImage(),
            friend.getAddresses());
    }

    public FriendResponse(String memberId, String name, String profileImage,
        List<Address> addresses) {
        this.memberId = memberId;
        this.name = name;
        this.profileImage = profileImage;
        this.addresses = addresses;
    }

    public String getMemberId() {
        return memberId;
    }

    public String getName() {
        return name;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public List<Address> getAddresses() {
        return addresses;
    }
}
