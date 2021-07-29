package seeuthere.goodday.member.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.AddressDeleteRequest;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.dto.AddressUpdateRequest;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.dto.FriendResponse;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.dto.MemberResponse;
import seeuthere.goodday.member.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponse> findMemberInfo(@EnableAuth String id) {
        Member member = memberService.find(id);
        return ResponseEntity.ok()
            .body(new ProfileResponse(member.getId(), member.getName(), member.getProfileImage()));
    }

    @PutMapping
    public ResponseEntity<MemberResponse> updateMember(@EnableAuth String id,
        @RequestBody MemberRequest request) {
        MemberResponse memberResponse = memberService.updateMemberInfo(id, request);
        return ResponseEntity.ok().body(memberResponse);
    }

    @GetMapping("/address")
    public ResponseEntity<List<AddressResponse>> findMyAddress(@EnableAuth String id) {
        List<AddressResponse> addressResponse = memberService.findAddress(id);
        return ResponseEntity.ok().body(addressResponse);
    }

    @PostMapping("/address")
    public ResponseEntity<AddressResponse> addMyAddress(@EnableAuth String id,
        @RequestBody AddressRequest request) {
        AddressResponse addressResponse = memberService.addAddress(id, request);
        return ResponseEntity.ok().body(addressResponse);
    }

    @PutMapping("/address")
    public ResponseEntity<AddressResponse> updateMyAddress(@EnableAuth String id,
        @RequestBody AddressUpdateRequest request) {
        AddressResponse addressResponse = memberService.updateAddress(id, request);
        return ResponseEntity.ok().body(addressResponse);
    }

    @DeleteMapping("/address")
    public ResponseEntity<Void> deleteMyAddress(@EnableAuth String id,
        @RequestBody AddressDeleteRequest request) {
        memberService.deleteAddress(id, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/friends")
    public ResponseEntity<FriendResponse> addFriends(@EnableAuth String id,
        @RequestBody FriendRequest friendRequest) {
        FriendResponse friendResponse = memberService.addFriend(id, friendRequest);
        return ResponseEntity.ok().body(friendResponse);
    }

    @GetMapping("/friends")
    public ResponseEntity<List<FriendResponse>> findFriends(@EnableAuth String id) {
        List<FriendResponse> friends = memberService.findFriends(id);
        return ResponseEntity.ok().body(friends);
    }

    @DeleteMapping("/friends")
    public ResponseEntity<Void> deleteFriend(@EnableAuth String id,
        @RequestBody FriendRequest request) {
        memberService.deleteFriend(id, request);
        return ResponseEntity.noContent().build();
    }
}
