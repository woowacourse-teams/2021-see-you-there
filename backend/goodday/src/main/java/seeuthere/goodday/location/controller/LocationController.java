package seeuthere.goodday.location.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/location")
public class LocationController {

    /*
        중간지점 찾기
        request 를 body 로 받는게 좋을것 같은데, 의논 필요
    */
    @PostMapping("/middle")
    public ResponseEntity<Void> findMiddle(@RequestParam double x, @RequestParam double y) {
        return ResponseEntity.ok().build();
    }
}
