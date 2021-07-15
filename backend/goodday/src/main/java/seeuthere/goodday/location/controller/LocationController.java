package seeuthere.goodday.location.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.location.dto.AxisDocument;
import seeuthere.goodday.location.dto.Document;
import seeuthere.goodday.location.service.LocationService;

import java.util.List;

@RestController
@RequestMapping("/api/location")
public class LocationController {

    /*
        중간지점 찾기
        request 를 body 로 받는게 좋을것 같은데, 의논 필요
    */

    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/address")
    public ResponseEntity<List<Document>> findAddress(@RequestParam double x,
                                                      @RequestParam double y) {
        List<Document> documents = locationService.findAddress(x, y);
        return ResponseEntity.ok(documents);
    }

    @GetMapping("/coordinate")
    public ResponseEntity<List<AxisDocument>> findAxis(@RequestParam String address) {
        List<AxisDocument> axisDocuments = locationService.findAxis(address);
        return ResponseEntity.ok(axisDocuments);
    }
}
