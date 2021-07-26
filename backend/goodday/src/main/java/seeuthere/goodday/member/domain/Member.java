package seeuthere.goodday.member.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import seeuthere.goodday.member.dto.MemberRequest;

@AttributeOverride(name = "id", column = @Column(name = "memberId"))
@Entity
public class Member {

    protected String name;
    @Column(name = "PROFILE_IMAGE")
    protected String profileImage;
    @Id
    @Column(name = "MEMBER_ID")
    private String id;
    @Column(name = "MEMBER_SEARCH_ID")
    private String memberId;
    @OneToMany(mappedBy = "member")
    private final List<Address> addresses = new ArrayList<>();

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
}
