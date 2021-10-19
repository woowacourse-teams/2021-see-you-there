package seeuthere.goodday.member.dto;

public class AddressRequest {

    private String nickname;
    private String addressName;
    private String fullAddress;
    private Double x;
    private Double y;

    public AddressRequest() {
    }

    public AddressRequest(String nickname, String addressName, String fullAddress, Double x,
        Double y) {
        this.nickname = nickname;
        this.addressName = addressName;
        this.fullAddress = fullAddress;
        this.x = x;
        this.y = y;
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
