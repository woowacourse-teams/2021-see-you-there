package seeuthere.goodday.member.dto;

public class AddressRequest {

    private final String name;
    private final String address;

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
