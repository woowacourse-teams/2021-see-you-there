package seeuthere.goodday.location.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.location.domain.location.Location;
import seeuthere.goodday.location.dto.api.response.APILocationDocument;
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.response.ResponseFormat;
import seeuthere.goodday.location.dto.api.response.APIUtilityDocument;
import seeuthere.goodday.location.service.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/address")
    public ResponseEntity<ResponseFormat<APILocationDocument>> findAddress(@RequestParam double x,
        @RequestParam double y) {
        List<APILocationDocument> APILocationDocuments = locationService.findAddress(x, y);
        return ResponseEntity.ok(new ResponseFormat<>(APILocationDocuments));
    }

    @GetMapping("/coordinate")
    public ResponseEntity<ResponseFormat<Location>> findAxis(@RequestParam String address) {
        List<Location> locations = locationService.findAxis(address);
        return ResponseEntity.ok(new ResponseFormat<>(locations));
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseFormat<APIUtilityDocument>> findBasicUtility(
        @RequestParam String keyword) {
        List<APIUtilityDocument> documents = locationService.findSearch(keyword);
        return ResponseEntity.ok(new ResponseFormat<>(documents));
    }

    @GetMapping("/utility/{category}")
    public ResponseEntity<ResponseFormat<APIUtilityDocument>> findUtility(@PathVariable String category,
        @RequestParam double x, @RequestParam double y) {
        List<APIUtilityDocument> documents = locationService.findUtility(category, x, y);
        return ResponseEntity.ok(new ResponseFormat<>(documents));
    }

    @PostMapping("/middlePoint")
    public ResponseEntity<MiddlePointResponse> findMiddlePoint(
        @RequestBody LocationsRequest locationsRequest) {
        MiddlePointResponse middlePointResponse = locationService.findMiddlePoint(locationsRequest);
        return ResponseEntity.ok(middlePointResponse);
    }
}


