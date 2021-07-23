package seeuthere.goodday.path.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.path.service.PathService;

@RestController
@RequestMapping("/api/path")
public class PathController {

    private final PathService pathService;

    public PathController(PathService pathService) {
        this.pathService = pathService;
    }

    @GetMapping("/bus")
    public ResponseEntity<Void> busPath(@RequestParam double startX, @RequestParam double startY,
        @RequestParam double endX, @RequestParam double endY) {

        Point start = new Point(startX, startY);
        Point end = new Point(endX, endY);
        pathService.findBusPath(start, end);
        return null;
    }


}
