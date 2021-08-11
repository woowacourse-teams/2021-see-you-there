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
import seeuthere.goodday.member.dto.RequestFriendRequest;
import seeuthere.goodday.member.dto.RequestFriendResponse;
import seeuthere.goodday.member.service.MemberService;

@RestController
@RequestMapping("/api/members/friends")
public class FriendController {

    private final MemberService memberService;

    public FriendController(MemberService memberService) {
        this.memberService = memberService;
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
    public ResponseEntity<MemberResponse> searchFriend(@EnableAuth String id,
        @RequestParam String searchWord) {
        MemberResponse response = memberService.searchFriend(id, searchWord);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/receiveList")
    public ResponseEntity<List<RequestFriendResponse>> getReceiveFriends(@EnableAuth String id) {
        List<RequestFriendResponse> response = memberService.findReceiveFriends(id);
        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/requestList")
    public ResponseEntity<List<RequestFriendResponse>> getRequestFriends(@EnableAuth String id) {
        List<RequestFriendResponse> response = memberService.findRequestFriends(id);
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/request")
    public ResponseEntity<Void> requestFriend(@EnableAuth String id,
        @RequestBody FriendRequest friendRequest) {
        memberService.requestFriend(id, friendRequest);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/acceptance")
    public ResponseEntity<Void> acceptRequest(@EnableAuth String id,
        @RequestBody RequestFriendRequest request) {
        memberService.acceptFriend(id, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/refuse")
    public ResponseEntity<Void> refuseRequest(@EnableAuth String id,
        @RequestBody RequestFriendRequest request) {
        memberService.refuseFriend(id, request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/request/cancel")
    public ResponseEntity<Void> cancelRequest(@RequestBody RequestFriendRequest request) {
        memberService.cancelRequest(request);
        return ResponseEntity.ok().build();
    }
}
