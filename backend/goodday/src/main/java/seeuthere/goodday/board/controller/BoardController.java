package seeuthere.goodday.board.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardType;
import seeuthere.goodday.board.domain.Comment;
import seeuthere.goodday.board.dto.request.BoardRequest;
import seeuthere.goodday.board.dto.request.CommentRequest;
import seeuthere.goodday.board.dto.response.BoardResponse;
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
    public ResponseEntity<List<BoardResponse>> loadBoards(
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "0") long lastBoardId,
        @RequestParam(defaultValue = "ALL") BoardType type) {
        List<Board> boards = boardService.findAllWithPagination(lastBoardId, size, type);
        List<BoardResponse> boardResponses = boards.stream()
            .map(BoardResponse::new)
            .collect(Collectors.toList());
        return ResponseEntity.ok(boardResponses);
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
        @RequestBody CommentRequest commentRequest)
        throws URISyntaxException {
        Board board = boardService.findBoardById(id);
        Comment comment = commentRequest.toComment(board);
        boardService.addComment(board, comment);

        return ResponseEntity.created(new URI("/api/boards/" + id)).build();
    }

    @PutMapping("/{id}/comments")
    public ResponseEntity<Void> updateComment(@PathVariable Long id,
        @RequestBody CommentRequest commentRequest) {
        boardService.updateComment(id, commentRequest.getContent());
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}/comments")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        boardService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
