package seeuthere.goodday.board.controller;

import java.net.URI;
import java.net.URISyntaxException;
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
import seeuthere.goodday.board.domain.Comment;
import seeuthere.goodday.board.dto.request.BoardRequest;
import seeuthere.goodday.board.dto.request.BoardResponse;
import seeuthere.goodday.board.dto.request.CommentRequest;
import seeuthere.goodday.board.service.BoardService;
import seeuthere.goodday.member.domain.Admin;
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
        Board board = boardService.findBoardById(id);
        return ResponseEntity.ok(new BoardResponse(board));
    }

    @PostMapping
    public ResponseEntity<BoardResponse> createBoard(@RequestBody BoardRequest boardRequest,
        @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        Board board = boardRequest.toBoard(member);
        Board savedBoard = boardService.saveBoard(board);
        return ResponseEntity.ok(new BoardResponse(savedBoard));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BoardResponse> updateBoard(@PathVariable Long id,
        @EnableAuth String memberId,
        @RequestBody BoardRequest boardRequest) {
        Member member = memberService.find(memberId);
        Board board = boardRequest.toBoard(member);
        Board updateBoard = boardService.updateBoard(id, member, board);
        BoardResponse boardResponse = new BoardResponse(updateBoard);
        return ResponseEntity.ok(boardResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long id, @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        boardService.deleteBoard(id, member);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/comments")
    public ResponseEntity<Void> createComment(@PathVariable Long id,
        @EnableAuth String memberId, @RequestBody CommentRequest commentRequest)
        throws URISyntaxException {
        Member member = memberService.find(memberId);
        Admin admin = memberService.findAdminByMember(member);
        Board board = boardService.findBoardById(id);
        Comment comment = commentRequest.toComment(board, admin);
        boardService.addComment(board, comment);

        return ResponseEntity.created(new URI("/api/boards/" + id)).build();
    }

    @PutMapping("/{id}/comments")
    public ResponseEntity<Void> updateComment(@PathVariable Long id,
        @EnableAuth String memberId, @RequestBody CommentRequest commentRequest) {
        Member member = memberService.find(memberId);
        Admin admin = memberService.findAdminByMember(member);
        boardService.updateComment(id, commentRequest.getContent(), admin);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/comments")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id,
        @EnableAuth String memberId) {
        Member member = memberService.find(memberId);
        memberService.findAdminByMember(member);
        boardService.deleteComment(id);

        return ResponseEntity.noContent().build();
    }
}
