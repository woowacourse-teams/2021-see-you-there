package seeuthere.goodday.board;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import java.util.Objects;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.DataLoader;
import seeuthere.goodday.TestMethod;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardLabel;
import seeuthere.goodday.board.dto.request.BoardRequest;
import seeuthere.goodday.board.dto.request.BoardResponse;
import seeuthere.goodday.board.dto.request.CommentRequest;
import seeuthere.goodday.board.service.BoardService;

class BoardAcceptanceTest extends AcceptanceTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private BoardService boardService;

    @DisplayName("게시판 작성")
    @Test
    void writeBoard() {
        //given
        String title = "여기서 만나 화이팅이에요";
        String content = "밥사주세요";
        BoardLabel boardLabel = BoardLabel.FIX;
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        BoardRequest boardRequest = new BoardRequest(title, content, boardLabel);

        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            token,
            boardRequest
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
        String title = "원하는 게시글 찾기";
        String content = "너의 게시글은?";
        BoardLabel boardLabel = BoardLabel.FIX;
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        BoardRequest boardRequest = new BoardRequest(title, content, boardLabel);
        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            token,
            boardRequest
        ).as(BoardResponse.class);

        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.GET, token);
        BoardResponse findBoard = response.as(BoardResponse.class);

        // then
        assertThat(board).usingRecursiveComparison().isEqualTo(findBoard);
    }

    @DisplayName("게시물을 수정한다.")
    @Test
    void updateBoard() {
        // given
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        BoardRequest boardRequest = new BoardRequest("수정 전 제목", "수정 전 글", BoardLabel.FIX);

        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            token,
            boardRequest
        ).as(BoardResponse.class);

        BoardRequest updateRequest = new BoardRequest("수정 후 제목", "수정 후 글", BoardLabel.FIX);
        String url = "/api/boards/" + board.getId();

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.PUT, token,
            updateRequest);

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
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        BoardRequest boardRequest = new BoardRequest("YB", "글", BoardLabel.FIX);
        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            token,
            boardRequest
        ).as(BoardResponse.class);

        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.DELETE, token);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @DisplayName("내 소유의 게시글이 아니라면 수정할 수 없다.")
    void updateException() {
        // given
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        String fixToken = jwtTokenProvider.createToken(DataLoader.하루.getId());
        BoardRequest boardRequest = new BoardRequest("YB", "글", BoardLabel.FIX);
        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            token,
            boardRequest
        ).as(BoardResponse.class);

        String url = "/api/boards/" + board.getId();

        // when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.PUT, fixToken,
            boardRequest);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("내 소유의 게시글이 아니라면 삭제할 수 없다.")
    void deleteException() {
        // given
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        String fixToken = jwtTokenProvider.createToken(DataLoader.하루.getId());
        BoardRequest boardRequest = new BoardRequest("수정 전 제목", "수정 전 글", BoardLabel.FIX);
        BoardResponse board = makeResponse("/api/boards",
            TestMethod.POST,
            token,
            boardRequest
        ).as(BoardResponse.class);

        String url = "/api/boards/" + board.getId();

        //when
        ExtractableResponse<Response> response = makeResponse(url, TestMethod.DELETE, fixToken);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("답글을 생성한다.")
    void creteComment() {
        //given
        String token = jwtTokenProvider.createToken(DataLoader.하루.getId());
        Board board = createBoard();
        CommentRequest commentRequest = new CommentRequest("관리자가 남긴 답변입니다.");

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/boards/%d/comments", board.getId()), TestMethod.POST, token,
            commentRequest);

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.CREATED.value());
        Board boardResponse = getBoard(board.getId());
        assertThat(boardResponse.getComment().getContent()).isEqualTo("관리자가 남긴 답변입니다.");
    }

    // 답글 수정 기능

    // 답글 삭제 기능

    // 게시글 관련 테스트도 서비스 이용으로

    // 실패제 삭글 답 답
    //
    // /// 는다글 답에 글시게데, 는있이 글그답 글시게//게



    // 멍토가 칭찬을 해줬다 7 예정

    private ExtractableResponse<Response> makeResponse(String url, TestMethod testMethod,
        String token) {
        return makeResponse(url, testMethod, token, null);
    }

    private ExtractableResponse<Response> makeResponse(String url, TestMethod testMethod,
        String token, Object requestBody) {
        RequestSpecification request = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE);
        if (Objects.nonNull(requestBody)) {
            request = request.body(requestBody);
        }
        return testMethod.extractedResponse(request, url);
    }

    private Board createBoard() {
        Board board = new Board("여기서 만나 화이팅이에요", "밥사주세요", BoardLabel.FIX, DataLoader.와이비);
        return boardService.saveBoard(board);
    }

    private Board getBoard(long id) {
        return boardService.findBoardById(id);
    }
}
