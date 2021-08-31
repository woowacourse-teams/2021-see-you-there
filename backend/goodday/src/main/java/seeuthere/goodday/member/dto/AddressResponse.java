package seeuthere.goodday.member.dto;

import seeuthere.goodday.member.domain.Address;

public class AddressResponse {

    private Long id;
    private String nickname;
    private String addressName;
    private String fullAddress;
    private Double x;
    private Double y;

    public AddressResponse() {
    }

    private AddressResponse(Builder builder) {
        this.id = builder.id;
        this.nickname = builder.nickname;
        this.addressName = builder.addressName;
        this.fullAddress = builder.fullAddress;
        this.x = builder.x;
        this.y = builder.y;
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

        public Builder x(double x) {
            this.x = x;
            return this;
        }

        public Builder y(double y) {
            this.y = y;
            return this;
        }

        public AddressResponse build() {
            return new AddressResponse(this);
        }
    }

    public static AddressResponse valueOf(Address address) {
        return new Builder()
            .id(address.getId())
            .nickname(address.getNickname())
            .addressName(address.getAddressName())
            .fullAddress(address.getFullAddress())
            .x(address.getX())
            .y(address.getY())
            .build();
    }
}
