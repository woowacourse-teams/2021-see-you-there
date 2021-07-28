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

    public AddressResponse(Address address) {
        this(address.getId(), address.getNickname(), address.getAddressName(),
            address.getFullAddress(), address.getX(), address.getY());
    }

    public AddressResponse(Long id, String nickname, String addressName, String fullAddress, Double x,
        Double y) {
        this.id = id;
        this.nickname = nickname;
        this.addressName = addressName;
        this.fullAddress = fullAddress;
        this.x = x;
        this.y = y;
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
}
