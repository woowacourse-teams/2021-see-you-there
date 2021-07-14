package seeuthere.goodday.location.dto;

public class AxisDocument {

    private double x;
    private double y;
    private Address address;
    private Address roadAddress;

    public AxisDocument() {

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
