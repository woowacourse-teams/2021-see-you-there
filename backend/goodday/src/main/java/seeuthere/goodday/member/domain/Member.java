package seeuthere.goodday.member.domain;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.AttributeOverride;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import seeuthere.goodday.member.dto.MemberRequest;

@AttributeOverride(name = "id", column = @Column(name = "memberId"))
@Entity
public class Member extends Person {

    private String memberId;

    @OneToMany
    @JoinColumn(name = "PERSON_ID")
    private List<Member> friends = new ArrayList<>();

    @OneToMany(mappedBy = "member")
    private List<Address> addresses = new ArrayList<>();

    public Member() {
    }

    public Member(String id, String memberId, String name, String profileImage) {
        super(id, name, profileImage);
        this.memberId = memberId;
    }

    public void update(MemberRequest request) {
        this.name = request.getName();
        this.profileImage = request.getProfileImage();
        this.memberId = request.getMemberId();
    }

    public String getMemberId() {
        return memberId;
    }

    public void addAddress(Address address) {
        address.setMember(this);
        this.addresses.add(address);
    }
}
