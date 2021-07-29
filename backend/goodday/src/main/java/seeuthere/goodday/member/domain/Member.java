package seeuthere.goodday.member.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import seeuthere.goodday.member.dto.MemberRequest;

@Entity
public class Member {

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Address> addresses = new ArrayList<>();
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<FriendShip> friends = new HashSet<>();
    protected String name;
    @Column(name = "PROFILE_IMAGE")
    protected String profileImage;
    @Id
    @Column(name = "MEMBER_ID")
    private String id;
    @Column(name = "MEMBER_SEARCH_ID")
    private String memberId;

    public Member() {
    }

    public Member(String id, String memberId, String name, String profileImage) {
        this.id = id;
        this.memberId = memberId;
        this.name = name;
        this.profileImage = profileImage;
    }

    public void update(MemberRequest request) {
        this.name = request.getName();
        this.profileImage = request.getProfileImage();
        this.memberId = request.getMemberId();
    }

    public void addAddress(Address address) {
        address.setMember(this);
        this.addresses.add(address);
    }

    public Address updateAddress(Long addressId, String name, String addressName) {
        Address address = this.addresses.stream()
            .filter(ad -> ad.getId().equals(addressId))
            .findFirst()
            .orElseThrow();

        return address.update(name, addressName);
    }

    public void deleteAddress(Long id) {
        this.addresses.removeIf(address -> address.getId().equals(id));
    }

    public void addFriend(Member friend) {
        this.friends.add(new FriendShip(this, friend));
        if (friend.getFriends().stream()
            .noneMatch(friendShip -> friendShip.getFriend().equals(this))) {
            friend.addFriend(this);
        }
    }

    public void deleteFriend(Member friend) {
        if (getMemberFriends().contains(friend) && friend.getMemberFriends().contains(this)) {
            friends.removeIf(friendShip -> friendShip.getFriend().equals(friend));
            friend.friends.removeIf(friendShip -> friendShip.getFriend().equals(this));
            return;
        }
        // TODO : 친구 추가 에러
        throw new RuntimeException();
    }

    public List<Member> getMemberFriends() {
        return this.friends.stream()
            .map(FriendShip::getFriend)
            .collect(Collectors.toList());
    }

    public String getId() {
        return id;
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

    public Set<FriendShip> getFriends() {
        return friends;
    }
}
