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
import seeuthere.goodday.location.domain.Location;
import seeuthere.goodday.location.dto.Document;
import seeuthere.goodday.location.dto.LocationsRequest;
import seeuthere.goodday.location.dto.MiddlePointResponse;
import seeuthere.goodday.location.dto.Response;
import seeuthere.goodday.location.dto.UtilityDocument;
import seeuthere.goodday.location.service.LocationService;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/address")
    public ResponseEntity<Response<Document>> findAddress(@RequestParam double x,
        @RequestParam double y) {
        List<Document> documents = locationService.findAddress(x, y);
        return ResponseEntity.ok(new Response<>(documents));
    }

    @GetMapping("/coordinate")
    public ResponseEntity<Response<Location>> findAxis(@RequestParam String address) {
        List<Location> locations = locationService.findAxis(address);
        return ResponseEntity.ok(new Response<>(locations));
    }

    @GetMapping("/search")
    public ResponseEntity<Response<UtilityDocument>> findBasicUtility(
        @RequestParam String keyword) {
        List<UtilityDocument> documents = locationService.findSearch(keyword);
        return ResponseEntity.ok(new Response<>(documents));
    }

    @GetMapping("/utility/{category}")
    public ResponseEntity<Response<UtilityDocument>> findUtility(@PathVariable String category,
        @RequestParam double x, @RequestParam double y) {
        List<UtilityDocument> documents = locationService.findUtility(category, x, y);
        return ResponseEntity.ok(new Response<>(documents));
    }

    @PostMapping("/middlePoint")
    public ResponseEntity<MiddlePointResponse> findMiddlePoint(
        @RequestBody LocationsRequest locationsRequest) {
        MiddlePointResponse middlePointResponse = locationService.findMiddlePoint(locationsRequest);
        return ResponseEntity.ok(middlePointResponse);
    }
}


