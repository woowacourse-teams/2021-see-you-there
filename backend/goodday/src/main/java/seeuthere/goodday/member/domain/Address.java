package seeuthere.goodday.member.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Address {

    @Id
    @GeneratedValue
    @Column(name = "ADDRESS_ID")
    private Long id;

    private String nickname;

    private String addressName;

    private String fullAddress;

    private Double x;

    private Double y;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    Member member;

    public Address() {
    }

    public Address(String nickname, String addressName, String fullAddress, Double x, Double y) {
        this(null, nickname, addressName, fullAddress, x, y);
    }

    public Address(Long id, String nickname, String addressName, String fullAddress, Double x,
        Double y) {
        this.id = id;
        this.nickname = nickname;
        this.addressName = addressName;
        this.fullAddress = fullAddress;
        this.x = x;
        this.y = y;
    }

    public Address(Builder builder) {
        this.id = builder.id;
        this.nickname = builder.nickname;
        this.addressName = builder.addressName;
        this.fullAddress = builder. fullAddress;
        this.x = builder.x;
        this.y = builder.y;
    }

    public Address update(Address address) {
        this.nickname = address.getNickname();
        this.addressName = address.getAddressName();
        this.fullAddress = address.getFullAddress();
        this.x = address.getX();
        this.y = address.getY();

        return this;
    }

    public Long getId() {
        return id;
    }

    public String getNickname() {
        return nickname;
    }

    public String getAddressName() {
        return addressName;
    }

    public String getFullAddress() {
        return fullAddress;
    }

    public Double getX() {
        return x;
    }

    public Double getY() {
        return y;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public static class Builder {

        private Long id;
        private String nickname;
        private String addressName;
        private String fullAddress;
        private Double x;
        private Double y;

        public Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder nickname(String nickname) {
            this.nickname = nickname;
            return this;
        }

        public Builder addressName(String addressName) {
            this.addressName = addressName;
            return this;
        }

        public Builder fullAddress(String fullAddress) {
            this.fullAddress = fullAddress;
            return this;
        }

        public Builder x(Double x) {
            this.x = x;
            return this;
        }

        public Builder y(Double y) {
            this.y = y;
            return this;
        }

        public Address build() {
            return new Address(this);
        }
    }
}
