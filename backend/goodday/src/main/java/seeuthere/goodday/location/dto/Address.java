package seeuthere.goodday.location.dto;

public class Address {

    private String addressName;

    public Address() {
    }

    public Address(String addressName) {
        this.addressName = addressName;
    }

    public String getAddressName() {
        return addressName;
    }

    @Override
    public String toString() {
        return "Address{" +
                "addressName='" + addressName + '\'' +
                '}';
    }
}
