package seeuthere.goodday.board.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.dto.request.BoardRequest;
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
    public void findBoard() {
        boardService.findById();
    }

    @PostMapping
    public ResponseEntity<Board> createBoard(@RequestBody BoardRequest boardRequest,
        @EnableAuth String id) {
        Board board = boardRequest.toBoard(memberService.find(id));
        return ResponseEntity.ok(boardService.save(board));
    }

    @PostMapping("/{id}")
    public void updateBoard() {
        boardService.update();
    }

    @DeleteMapping
    public void deleteBoard() {
        boardService.delete();
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
