package seeuthere.goodday.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.service.MemberService;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<ProfileDto> findMemberInfo(@EnableAuth String id) {
        Member member = memberService.find(id);
        return ResponseEntity.ok()
            .body(new ProfileDto(member.getId(), member.getName(), member.getProfileImage()));
    }

    /*
     *   개인정보 수정
     * */
    @PutMapping
    public ResponseEntity<Void> updateMember() {
        return ResponseEntity.ok().build();
    }

    @GetMapping("/address")
    public ResponseEntity<Void> findMyAddress() {
        return ResponseEntity.ok().build();
    }

    @PostMapping("/address")
    public ResponseEntity<Void> addMyAddress() {
        return ResponseEntity.ok().build();
    }

    @PutMapping("/address")
    public ResponseEntity<Void> updateMyAddress() {
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/address")
    public ResponseEntity<Void> deleteMyAddress() {
        return ResponseEntity.ok().build();
    }


}
