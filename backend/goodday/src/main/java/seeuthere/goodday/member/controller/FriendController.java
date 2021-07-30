package seeuthere.goodday.member.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.dto.FriendResponse;
import seeuthere.goodday.member.dto.MemberResponse;
import seeuthere.goodday.member.service.MemberService;

@RestController
@RequestMapping("/api/members/friends")
public class FriendController {

    private final MemberService memberService;

    public FriendController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<FriendResponse> addFriends(@EnableAuth String id,
        @RequestBody FriendRequest friendRequest) {
        FriendResponse friendResponse = memberService.addFriend(id, friendRequest);
        return ResponseEntity.ok().body(friendResponse);
    }

    @GetMapping
    public ResponseEntity<List<FriendResponse>> findFriends(@EnableAuth String id) {
        List<FriendResponse> friends = memberService.findFriends(id);
        return ResponseEntity.ok().body(friends);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteFriend(@EnableAuth String id,
        @RequestBody FriendRequest request) {
        memberService.deleteFriend(id, request);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<MemberResponse>> searchFriend(@EnableAuth String id,
        @RequestParam String searchWord) {
        List<MemberResponse> response = memberService.searchFriend(id, searchWord);
        return ResponseEntity.ok().body(response);
    }
}
