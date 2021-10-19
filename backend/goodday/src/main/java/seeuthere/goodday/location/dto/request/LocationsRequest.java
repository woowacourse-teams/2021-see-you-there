package seeuthere.goodday.location.dto.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class LocationsRequest {

    @JsonProperty("locations")
    private List<LocationRequest> locationRequests;

    public LocationsRequest() {
    }

    public LocationsRequest(List<LocationRequest> locationRequests) {
        this.locationRequests = locationRequests;
    }

    public List<LocationRequest> getLocationRequests() {
        return locationRequests;
    }
}
