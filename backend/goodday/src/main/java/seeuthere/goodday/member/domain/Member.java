package seeuthere.goodday.member.domain;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.exception.MemberExceptionSet;

@Entity
public class Member {

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private final List<Address> addresses = new ArrayList<>();
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private final Set<FriendShip> friends = new HashSet<>();

    @Column(nullable = false)
    private String nickname;
    @Column(name = "PROFILE_IMAGE")
    private String profileImage;
    @Id
    @Column(name = "MEMBER_ID")
    private String id;
    @Column(name = "MEMBER_SEARCH_ID", unique = true, nullable = false)
    private String memberId;

    public Member() {
    }

    public Member(String id, String memberId, String nickname, String profileImage) {
        this.id = id;
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }

    public void update(MemberRequest request) {
        this.nickname = request.getNickname();
        this.profileImage = request.getProfileImage();
        this.memberId = request.getMemberId();
    }

    public void addAddress(Address address) {
        address.setMember(this);
        this.addresses.add(address);
    }

    public Address updateAddress(Address newAddress) {
        Address address = this.addresses.stream()
            .filter(ad -> ad.getId().equals(newAddress.getId()))
            .findFirst()
            .orElseThrow();

        return address.update(newAddress);
    }

    public void deleteAddress(Long id) {
        final Address deleteAddress = addresses.stream()
            .filter(address -> address.getId().equals(id))
            .findFirst()
            .orElseThrow(
                () -> new GoodDayException(MemberExceptionSet.UNABLE_DELETE_AUTHORIZATION));
        this.addresses.remove(deleteAddress);
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
        throw new GoodDayException(MemberExceptionSet.INVALID_MEMBER);
    }

    public List<Member> getMemberFriends() {
        return this.friends.stream()
            .map(FriendShip::getFriend)
            .sorted(Comparator.comparing(Member::getNickname))
            .collect(Collectors.toList());
    }

    public boolean hasFriend(Member receiver) {
        return getMemberFriends().contains(receiver);
    }

    public String getId() {
        return id;
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

    public Set<FriendShip> getFriends() {
        return friends;
    }

}
