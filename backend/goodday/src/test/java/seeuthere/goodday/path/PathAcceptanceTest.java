package seeuthere.goodday.path;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;

public class PathAcceptanceTest extends AcceptanceTest {

    private static final String BASIC_URL = "api/path/";
    private static final String BASIC_START_X = "startX=126.98170666658032";
    private static final String BASIC_START_Y = "startY=37.48554983506427";
    private static final String BASIC_END_X = "endX=127.02740306334805";
    private static final String BASIC_END_Y = "endY=37.497965736290396";
    private static final String PARAMETERS;

    static {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(BASIC_START_X)
            .append("&")
            .append(BASIC_START_Y)
            .append("&")
            .append(BASIC_END_X)
            .append("&")
            .append(BASIC_END_Y);
        PARAMETERS = stringBuilder.toString();
    }

    @Test
    @DisplayName("bus 테스트")
    void bus() {
        //given
        String transport = "bus?";
        String path = BASIC_URL + transport;
        String identifier = "bus";

        //when
        ExtractableResponse<Response> response
            = getResponse(path + PARAMETERS, identifier);

        //then
        validateResponse(response);
    }

    @Test
    @DisplayName("subway 테스트")
    void subway() {
        //given
        String transport = "subway?";
        String path = BASIC_URL + transport;
        String identifier = "subway";

        //when
        ExtractableResponse<Response> response
            = getResponse(path + PARAMETERS, identifier);

        //then
        validateResponse(response);
    }

    @Test
    @DisplayName("transfer 테스트")
    void transfer() {
        //given
        String transport = "transfer?";
        String path = BASIC_URL + transport;
        String identifier = "transfer";

        //when
        ExtractableResponse<Response> response
            = getResponse(path + PARAMETERS, identifier);

        //then
        validateResponse(response);
    }

    private ExtractableResponse<Response> getResponse(String path, String identifier) {
        return RestAssured.given(this.spec)
            .accept(MediaType.APPLICATION_JSON_VALUE)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .when().get(path)
            .then().extract();
    }

    private void validateResponse(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.body()).isNotNull();
    }
}
