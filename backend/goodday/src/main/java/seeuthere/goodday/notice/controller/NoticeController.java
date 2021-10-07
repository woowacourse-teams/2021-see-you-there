package seeuthere.goodday.notice.controller;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.service.MemberService;
import seeuthere.goodday.notice.domain.Notice;
import seeuthere.goodday.notice.dto.NoticeRequest;
import seeuthere.goodday.notice.dto.NoticeResponse;
import seeuthere.goodday.notice.service.NoticeService;

@Controller
@RequestMapping("/api/notice")
public class NoticeController {

    private final NoticeService noticeService;
    private final MemberService memberService;

    public NoticeController(NoticeService noticeService, MemberService memberService) {
        this.noticeService = noticeService;
        this.memberService = memberService;
    }

    @GetMapping
    public ResponseEntity<List<NoticeResponse>> loadNotice() {
        List<Notice> notices = noticeService.findAll();
        List<NoticeResponse> responses = notices.stream()
            .map(NoticeResponse::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    @PostMapping
    public ResponseEntity<NoticeResponse> makeNotice(@RequestBody NoticeRequest noticeRequest,
        @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        memberService.findAdminByMember(member);
        Notice notice = noticeService.save(noticeRequest.getTitle(), noticeRequest.getContent());
        return ResponseEntity.ok(new NoticeResponse(notice));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> inactiveNotice(@PathVariable Long id, @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        memberService.findAdminByMember(member);
        noticeService.inactive(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoticeResponse> updateNotice(@PathVariable Long id,
        @RequestBody NoticeRequest noticeRequest, @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        memberService.findAdminByMember(member);
        Notice notice = noticeService
            .edit(id, noticeRequest.getTitle(), noticeRequest.getContent());
        return ResponseEntity.ok(new NoticeResponse(notice));
    }
}
