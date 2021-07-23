package seeuthere.goodday.member.domain;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;
import seeuthere.goodday.member.dto.MemberRequest;

@Entity
public class Member extends Person {

    private String memberId;

    @OneToMany
    private List<Member> friends;

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
}
