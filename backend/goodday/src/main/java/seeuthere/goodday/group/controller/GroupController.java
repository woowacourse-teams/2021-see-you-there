package seeuthere.goodday.group.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/group")
public class GroupController {

    @GetMapping("/histories")
    public ResponseEntity<Void> findHistories() {
        return ResponseEntity.ok().build();
    }
}
