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
import seeuthere.goodday.location.dto.request.LocationsRequest;
import seeuthere.goodday.location.dto.response.LocationResponse;
import seeuthere.goodday.location.dto.response.MiddlePointResponse;
import seeuthere.goodday.location.dto.response.ResponseFormat;
import seeuthere.goodday.location.dto.response.SpecificLocationResponse;
import seeuthere.goodday.location.dto.response.UtilityResponse;
import seeuthere.goodday.location.service.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/address")
    public ResponseEntity<ResponseFormat<SpecificLocationResponse>> findAddress(
        @RequestParam double x, @RequestParam double y) {
        List<SpecificLocationResponse> apiLocationDocuments = locationService.findAddress(x, y);
        return ResponseEntity.ok(new ResponseFormat<>(apiLocationDocuments));
    }

    @GetMapping("/coordinate")
    public ResponseEntity<ResponseFormat<LocationResponse>> findAxis(@RequestParam String address) {
        List<LocationResponse> locations = locationService.findAxis(address);
        return ResponseEntity.ok(new ResponseFormat<>(locations));
    }

    @GetMapping("/search")
    public ResponseEntity<ResponseFormat<UtilityResponse>> findBasicUtility(
        @RequestParam String keyword) {
        List<UtilityResponse> documents = locationService.findSearch(keyword);
        return ResponseEntity.ok(new ResponseFormat<>(documents));
    }

    @GetMapping("/utility/{category}")
    public ResponseEntity<ResponseFormat<UtilityResponse>> findUtility(
        @PathVariable String category,
        @RequestParam double x, @RequestParam double y) {
        List<UtilityResponse> documents = locationService.findUtility(category, x, y);
        return ResponseEntity.ok(new ResponseFormat<>(documents));
    }

    @PostMapping("/middlePoint")
    public ResponseEntity<MiddlePointResponse> findMiddlePoint(
        @RequestBody LocationsRequest locationsRequest) {
        MiddlePointResponse middlePointResponse = locationService.findMiddlePoint(locationsRequest);
        return ResponseEntity.ok(middlePointResponse);
    }
}


