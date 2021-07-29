package seeuthere.goodday.member.dto;

public class AddressUpdateRequest {

    private Long id;
    private String name;
    private String address;

    public AddressUpdateRequest() {

    }

    public AddressUpdateRequest(Long id, String name, String address) {
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
