package seeuthere.goodday.location.dto.api.response;

import seeuthere.goodday.location.dto.api.response.component.Address;

public class APIAxisDocument {

    private double x;
    private double y;
    private Address address;
    private Address roadAddress;

    public APIAxisDocument() {

    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    public Address getAddress() {
        return address;
    }

    public Address getRoadAddress() {
        return roadAddress;
    }
}
