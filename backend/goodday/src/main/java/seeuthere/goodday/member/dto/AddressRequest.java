package seeuthere.goodday.member.dto;

public class AddressRequest {

    private String name;
    private String address;

    public AddressRequest() {
    }

    public AddressRequest(String name, String address) {
        this.name = name;
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }
}
