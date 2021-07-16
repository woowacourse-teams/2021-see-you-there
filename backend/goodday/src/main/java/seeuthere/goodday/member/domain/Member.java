package seeuthere.goodday.member.domain;

import java.util.List;
import javax.persistence.Entity;
import javax.persistence.OneToMany;

@Entity
public class Member extends Person {

    @OneToMany
    private List<Member> friends;

    public Member() {
    }

    public Member(String id, String name) {
        super(id, name);
    }
}
