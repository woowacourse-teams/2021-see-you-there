package seeuthere.goodday.board;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.DataLoader;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.board.domain.BoardLabel;
import seeuthere.goodday.board.dto.request.BoardRequest;
import seeuthere.goodday.board.dto.request.BoardResponse;

class BoardAcceptanceTest extends AcceptanceTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("게시판 작성")
    @Test
    void writeBoard() {
        //given
        String title = "여기서 만나 화이팅이에요";
        String content = "밥사주세요";
        BoardLabel boardLabel = BoardLabel.FIX;
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        BoardRequest boardRequest = new BoardRequest(title, content, boardLabel);

        BoardResponse board = createBoard(token, boardRequest);

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
        BoardResponse board = createBoard(token, boardRequest);

        // when
        ExtractableResponse<Response> response = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().get("/api/boards/{id}", board.getId())
            .then()
            .extract();
        BoardResponse findBoard = response.as(BoardResponse.class);

        // then
        assertThat(board).usingRecursiveComparison().isEqualTo(findBoard);
    }

    @DisplayName("게시물을 수정한다.")
    @Test
    void updateBoard() {
        // given
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        BoardResponse board = createBoard(token,
            new BoardRequest("수정 전 제목", "수정 전 글", BoardLabel.FIX));

        BoardRequest updateRequest = new BoardRequest("수정 후 제목", "수정 후 글", BoardLabel.FIX);
        //when
        ExtractableResponse<Response> response = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .body(updateRequest)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().put("/api/boards/{id}", board.getId())
            .then()
            .extract();

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
        BoardResponse board = createBoard(token, boardRequest);

        // when
        ExtractableResponse<Response> response = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().delete("/api/boards/{id}", board.getId())
            .then()
            .extract();

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
        BoardResponse board = createBoard(token, boardRequest);

        // when
        ExtractableResponse<Response> response = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + fixToken)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().delete("/api/boards/{id}", board.getId())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @DisplayName("내 소유의 게시글이 아니라면 삭제할 수 없다.")
    void deleteException() {
        // given
        String token = jwtTokenProvider.createToken(DataLoader.와이비.getId());
        String fixToken = jwtTokenProvider.createToken(DataLoader.하루.getId());
        BoardResponse board = createBoard(token,
            new BoardRequest("수정 전 제목", "수정 전 글", BoardLabel.FIX));

        BoardRequest updateRequest = new BoardRequest("수정 후 제목", "수정 후 글", BoardLabel.FIX);

        //when
        ExtractableResponse<Response> response = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + fixToken)
            .body(updateRequest)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().put("/api/boards/{id}", board.getId())
            .then()
            .extract();

        // then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    private BoardResponse createBoard(String token, BoardRequest boardRequest) {
        //when
        ExtractableResponse<Response> response = RestAssured.given()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .body(boardRequest)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().post("/api/boards")
            .then()
            .extract();
        return response.as(BoardResponse.class);
    }
}
