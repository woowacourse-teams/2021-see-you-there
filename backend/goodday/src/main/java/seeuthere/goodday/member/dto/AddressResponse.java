package seeuthere.goodday.member.dto;

import seeuthere.goodday.member.domain.Address;

public class AddressResponse {

    private Long id;
    private String name;
    private String address;

    public AddressResponse() {
    }

    public AddressResponse(Address address) {
        this(address.getId(), address.getName(), address.getAddress());
    }

    public AddressResponse(Long id, String name, String address) {
        this.id = id;
        this.name = name;
        this.address = address;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }
}
