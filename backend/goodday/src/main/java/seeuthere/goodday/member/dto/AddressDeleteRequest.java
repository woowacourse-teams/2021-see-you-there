package seeuthere.goodday.member.dto;

public class AddressDeleteRequest {

    private Long id;

    public AddressDeleteRequest() {
    }

    public AddressDeleteRequest(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
