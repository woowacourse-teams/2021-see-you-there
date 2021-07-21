package seeuthere.goodday.study;

import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.subsectionWithPath;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

import io.restassured.RestAssured;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;

public class MapTest extends AcceptanceTest {

    private static String BASIC_ADDRESS = "전북 삼성동 100";

    @DisplayName("첫 테스트")
    @Test
    void findMap() {
        RestAssured.given(this.spec).log().all()
            .accept(MediaType.APPLICATION_JSON_VALUE)
            .filter(
                document("index",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint()),
                    responseFields(
                    subsectionWithPath("data").description("주소입니다.")
                    )
                )
            )
            .when().get("api/location/coordinate?address=" + BASIC_ADDRESS)
            .then().assertThat().statusCode(200);
    }

}