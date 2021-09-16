package seeuthere.goodday.board;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.DataLoader;
import seeuthere.goodday.TestMethod;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardLabel;
import seeuthere.goodday.board.domain.Comment;
import seeuthere.goodday.board.dto.request.BoardRequest;
import seeuthere.goodday.board.dto.response.BoardResponse;
import seeuthere.goodday.board.dto.request.CommentRequest;
import seeuthere.goodday.board.service.BoardService;

class BoardAcceptanceTest extends AcceptanceTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private BoardService boardService;

    // todo 관리자가 아닌 자가 댓글을 삭제하면 에러가 발생한다.

    @DisplayName("게시판 작성")
    @Test
    void writeBoard() {
        //given
        String identifier = "board/board-create";
        String title = "여기서 만나 화이팅이에요";
        String content = "밥사주세요";
        BoardLabel boardLabel = BoardLabel.FIX;
        BoardRequest boardRequest = new BoardRequest(title, content, boardLabel);

        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            DataLoader.와이비토큰,
            boardRequest,
            identifier
        ).as(BoardResponse.class);

        //then
        assertThat(board.getTitle()).isEqualTo(title);
        assertThat(board.getContent()).isEqualTo(content);
        assertThat(board.getLabel()).isEqualTo(boardLabel);
    }

    @Test
    @DisplayName("원하는 게시물을 불러온다.")
    void findById() {
        // given
        String identifier = "board/board-get";
        BoardResponse board = new BoardResponse(createBoard());
        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.GET,
            DataLoader.와이비토큰, identifier);
        BoardResponse findBoard = response.as(BoardResponse.class);

        // then
        assertThat(board).usingRecursiveComparison().isEqualTo(findBoard);
    }

    @DisplayName("게시물을 수정한다.")
    @Test
    void updateBoard() {
        // given
        String identifier = "board/board-update";
        BoardResponse board = new BoardResponse(createBoard());

        BoardRequest updateRequest = new BoardRequest("수정 후 제목", "수정 후 글", BoardLabel.FIX);
        String url = "/api/boards/" + board.getId();

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.PUT, DataLoader.와이비토큰,
            updateRequest, identifier);

        BoardResponse updatedBoard = response.as(BoardResponse.class);

        // then
        assertAll(
            () -> assertThat(updatedBoard.getTitle()).isEqualTo("수정 후 제목"),
            () -> assertThat(updatedBoard.getContent()).isEqualTo("수정 후 글"),
            () -> assertThat(updatedBoard.getLabel()).isEqualTo(BoardLabel.FIX)
        );
    }

    @Test
    @DisplayName("게시물을 삭제한다.")
    void deleteBoard() {
        // given
        String identifier = "board/board-delete";
        String token = DataLoader.와이비토큰;
        BoardResponse board = new BoardResponse(createBoard());
        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.DELETE, token, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("내 소유의 게시글이 아니라면 수정할 수 없다.")
    void updateException() {
        // given
        String identifier = "board/board-update-exception";
        BoardRequest boardRequest = new BoardRequest("YB", "글", BoardLabel.FIX);
        BoardResponse board = new BoardResponse(createBoard());

        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.PUT, DataLoader.하루토큰,
            boardRequest, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("내 소유의 게시글이 아니라면 삭제할 수 없다.")
    void deleteException() {
        // given
        String identifier = "board/board-delete-auth-exception";
        BoardResponse board = new BoardResponse(createBoard());

        String url = "/api/boards/" + board.getId();

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.DELETE,
            DataLoader.하루토큰, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("없는 게시글을 조회하면 에러가 발생한다.")
    void notExistReadException() {
        // given
        String identifier = "board/board-read-exist-exception";
        String url = "/api/boards/" + 999;

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.GET,
            DataLoader.하루토큰, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }


    @Test
    @DisplayName("게시글이 없는 상태에서 수정 하면 에러가 발생한다.")
    void notExistUpdateException() {
        // given
        String identifier = "board/board-update-exist-exception";
        BoardRequest boardRequest = new BoardRequest("YB", "글", BoardLabel.FIX);
        String url = "/api/boards/" + 999;

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.PUT,
            DataLoader.하루토큰, boardRequest, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("없는 게시글을 삭제하면 에러가 발생한다.")
    void noBoardDeleteException() {
        // given
        String identifier = "board/board-delete-exist-exception";
        String url = "/api/boards/" + 999;

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.DELETE,
            DataLoader.하루토큰, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("답글을 생성한다.")
    void creteComment() {
        //given
        String identifier = "board/comment-create";
        Board board = createBoard();
        String content = "관리자가 남긴 답변입니다.";
        CommentRequest commentRequest = new CommentRequest(content);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.POST,
            DataLoader.하루토큰,
            commentRequest, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        Board boardResponse = getBoard(board.getId());
        assertThat(boardResponse.getComment().getContent()).isEqualTo(content);
    }

    @Test
    @DisplayName("답글을 수정한다.")
    void updateComment() {
        // given
        String identifier = "board/comment-update";
        Board board = createBoard();
        addComment(board);
        String content = "관리자가 수정한 답변입니다";
        CommentRequest commentRequest = new CommentRequest(content);

        // when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.PUT,
            DataLoader.하루토큰,
            commentRequest, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        Board boardResponse = getBoard(board.getId());
        assertThat(boardResponse.getComment().getContent()).isEqualTo(content);
    }

    @Test
    @DisplayName("답글을 삭제한다.")
    void deleteComment() {
        // given
        String identifier = "board/comment-delete";
        Board board = createBoard();
        addComment(board);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.DELETE,
            DataLoader.하루토큰, identifier);

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
        Board boardResponse = getBoard(board.getId());
        assertThat(boardResponse.getComment()).isNull();
    }

    @Test
    @DisplayName("답글이 있는 상태에서 생성하면 에러가 발생한다.")
    void createAnotherCommentException() {
        String identifier = "board/comment-create-exception";
        Board board = createBoard();
        addComment(board);

        String content = "이미 있이 글답음";
        CommentRequest commentRequest = new CommentRequest(content);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.POST,
            DataLoader.하루토큰,
            commentRequest,
            identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.CONFLICT.value());
    }

    @Test
    @DisplayName("답글이 없는 상태에서 수정하면 에러가 발생한다.")
    void updateCommentWithoutExistingCommentException() {
        String identifier = "board/comment-update-exception";
        Board board = createBoard();

        String content = "답글이 없는데 수정함";
        CommentRequest commentRequest = new CommentRequest(content);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.PUT,
            DataLoader.하루토큰,
            commentRequest,
            identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("답글이 없는 상태에서 삭제하면 에러가 발생한다.")
    void deleteNonExistingCommentException() {
        String identifier = "board/comment-delete-exception";
        Board board = createBoard();

        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.DELETE,
            DataLoader.하루토큰,identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("특정 글자수 이하로 댓글을 생성하면 에러가 발생한다.")
    void commentContentLengthException() {
        //given
        String identifier = "board/comment-content-exception";
        Board board = createBoard();
        String content = "일";
        CommentRequest commentRequest = new CommentRequest(content);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.POST,
            DataLoader.하루토큰,
            commentRequest, identifier);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    @Test
    @DisplayName("관리자가 아닌 사람이 답글을 쓰려하면 에러가 발생한다.")
    void commentAuthorizationException() {
        String identifier = "board/comment-auth-create-exception";
        String token = jwtTokenProvider.createToken(DataLoader.멍토.getId());
        Board board = createBoard();
        String content = "관리자가 아닌 사람이 답글을 단다.";
        CommentRequest commentRequest = new CommentRequest(content);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.POST, token,
            commentRequest, identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("관리자가 아닌 사람이 답글을 수정하면 에러가 발생한다.")
    void commentAuthorizationUpdateException() {
        String identifier = "board/comment-auth-update-exception";
        String token = jwtTokenProvider.createToken(DataLoader.멍토.getId());
        Board board = createBoard();
        String content = "관리자가 아닌 사람이 답글을 수정한다.";
        CommentRequest commentRequest = new CommentRequest(content);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.PUT, token,
            commentRequest, identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("관리자가 아닌 사람이 답글을 삭제하면 에러가 발생한다.")
    void commentAuthorizationDeleteException() {
        String identifier = "board/comment-auth-delete-exception";
        String token = jwtTokenProvider.createToken(DataLoader.멍토.getId());
        Board board = createBoard();

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.DELETE, token,
            identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("댓글이 달린 상태에서 게시글을 수정할 수 없다.")
    void boardUpdateExceptionWithComment() {
        String identifier = "board/board-update-exception-with-comment";
        Board board = createBoard();
        addComment(board);

        BoardRequest boardRequest = new BoardRequest("YB", "글", BoardLabel.FIX);
        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.PUT, DataLoader.와이비토큰,
            boardRequest, identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    @Test
    @DisplayName("댓글이 달린 상태에서 게시글을 삭제할 수 없다.")
    void boardDeleteExceptionWithComment() {
        String identifier = "board/board-delete-exception-with-comment";
        Board board = createBoard();
        addComment(board);

        String url = "/api/boards/" + board.getId();

        ExtractableResponse<Response> response = makeResponse(url, TestMethod.DELETE, DataLoader.와이비토큰,
            identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.FORBIDDEN.value());
    }

    private Board createBoard() {
        Board board = new Board("여기서 만나 화이팅이에요", "밥사주세요", BoardLabel.FIX, DataLoader.와이비);
        return boardService.saveBoard(board);
    }

    private Board getBoard(long id) {
        return boardService.findBoardById(id);
    }

    private void addComment(Board board) {
        Comment comment = new Comment("수정전 답변입니다.", board, DataLoader.관리자하루);
        boardService.addComment(board, comment);
    }
}
