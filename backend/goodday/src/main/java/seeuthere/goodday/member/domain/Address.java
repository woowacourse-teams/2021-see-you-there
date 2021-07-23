package seeuthere.goodday.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Address {

    @Id @GeneratedValue
    @Column(name = "ADDRESS_ID")
    Long id;

    String name;

    String address;

    @ManyToOne
    @JoinColumn(name = "PERSON_ID")
    Member member;

    public Address() {

    }

    public Address(Long id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    public Address(String name, String address) {
        this(null, name, address);
    }

    public void setMember(Member member) {
        this.member = member;
    }
}
