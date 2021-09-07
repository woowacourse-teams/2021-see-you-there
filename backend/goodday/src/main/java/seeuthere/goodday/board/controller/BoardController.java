package seeuthere.goodday.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.dto.request.BoardRequest;
import seeuthere.goodday.board.dto.request.BoardResponse;
import seeuthere.goodday.board.service.BoardService;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.service.MemberService;

@Controller
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;
    private final MemberService memberService;

    public BoardController(BoardService boardService, MemberService memberService) {
        this.boardService = boardService;
        this.memberService = memberService;
    }

    @GetMapping
    public void loadBoards() {
        boardService.findAllWithPagination();
        // 제목만?
    }

    @GetMapping("/{id}")
    public ResponseEntity<BoardResponse> findBoard(@PathVariable Long id) {
        BoardResponse boardResponse = boardService.findById(id);
        return ResponseEntity.ok(boardResponse);
    }

    @PostMapping
    public ResponseEntity<BoardResponse> createBoard(@RequestBody BoardRequest boardRequest,
        @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        Board board = boardRequest.toBoard(member);
        BoardResponse boardResponse = boardService.save(board);
        return ResponseEntity.ok(boardResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponse> updateBoard(@PathVariable Long id,
        @EnableAuth String memberId,
        @RequestBody BoardRequest boardRequest) {
        Member member = memberService.find(memberId);
        Board board = boardRequest.toBoard(member);
        BoardResponse updatedBoard = boardService.update(id, member, board);
        return ResponseEntity.ok(updatedBoard);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id, @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        boardService.delete(id, member);
        return ResponseEntity.noContent().build();
    }

    // 하단은 관리자만 가능
    @GetMapping("/{id}/comment")
    public void findComment() {

    }

    @PostMapping("/{id}/comment")
    public void createComment() {

    }

    @PutMapping("/{id}/comment")
    public void updateComment() {

    }

    @DeleteMapping("/{id}/comment")
    public void deleteComment() {

    }

}
