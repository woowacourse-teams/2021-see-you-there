package seeuthere.goodday.board;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.DataLoader;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardLabel;
import seeuthere.goodday.board.dto.request.BoardRequest;

public class BoardAcceptanceTest extends AcceptanceTest {

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
        BoardRequest boardRequest = new BoardRequest(title, content, "FIX");

        //when
        ExtractableResponse<Response> response = RestAssured.given().log().all()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .body(boardRequest)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().post("/api/boards")
            .then().log().all()
            .extract();
        Board board = response.as(Board.class);

        //then
        assertThat(board.getTitle()).isEqualTo(title);
        assertThat(board.getContent()).isEqualTo(content);
        assertThat(board.getLabel()).isEqualTo(boardLabel);
    }
}
