package seeuthere.goodday.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/friends")
public class FriendController {

    @GetMapping
    public ResponseEntity<Void> findFriends() {
        return ResponseEntity.ok().build();
    }

    @PostMapping
    public ResponseEntity<Void> addFriend() {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFriend(@RequestParam Long id) {
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/address")
    public ResponseEntity<Void> findFriendAddress(@RequestParam Long id) {
        return ResponseEntity.ok().build();
    }
}
