package seeuthere.goodday.path.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.dto.PointWithName;
import seeuthere.goodday.path.dto.response.PathsResponse;
import seeuthere.goodday.path.service.PathService;

@RestController
@RequestMapping("/api/path")
public class PathController {

    private final PathService pathService;

    public PathController(PathService pathService) {
        this.pathService = pathService;
    }

    @GetMapping("/bus")
    public ResponseEntity<PathsResponse> busPath(@RequestParam double startX,
        @RequestParam double startY,
        @RequestParam double endX, @RequestParam double endY,
        @RequestParam String startName, @RequestParam String endName) {

        Point start = new Point(startX, startY);
        Point end = new Point(endX, endY);

        PointWithName startPointWithName = new PointWithName(start, startName);
        PointWithName endPointWithName = new PointWithName(end, endName);

        return ResponseEntity.ok(pathService.findBusPath(startPointWithName, endPointWithName));
    }

    @GetMapping("/subway")
    public ResponseEntity<PathsResponse> subwayPath(@RequestParam double startX,
        @RequestParam double startY,
        @RequestParam double endX, @RequestParam double endY,
        @RequestParam String startName, @RequestParam String endName) {

        Point start = new Point(startX, startY);
        Point end = new Point(endX, endY);

        PointWithName startPointWithName = new PointWithName(start, startName);
        PointWithName endPointWithName = new PointWithName(end, endName);

        return ResponseEntity.ok(pathService.findSubwayPath(startPointWithName, endPointWithName));
    }

    @GetMapping("/transfer")
    public ResponseEntity<PathsResponse> transferPath(@RequestParam double startX,
        @RequestParam double startY,
        @RequestParam double endX, @RequestParam double endY,
        @RequestParam String startName, @RequestParam String endName) {

        Point start = new Point(startX, startY);
        Point end = new Point(endX, endY);

        PointWithName startPointWithName = new PointWithName(start, startName);
        PointWithName endPointWithName = new PointWithName(end, endName);

        return ResponseEntity
            .ok(pathService.findTransferPath(startPointWithName, endPointWithName));
    }
}
