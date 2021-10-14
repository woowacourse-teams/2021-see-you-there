package seeuthere.goodday.location;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.time.LocalDateTime;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.exception.ErrorResponse;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.exception.LocationExceptionSet;

class LocationAcceptanceTest extends AcceptanceTest {

    @Test
    @DisplayName("coordinate 테스트")
    void coordinate() {
        //given
        String basicAddress = "전북 삼성동 100";
        String path = "api/locations/coordinate?address=" + basicAddress;
        String identifier = "coordinate";

        //when
        ExtractableResponse<Response> response
            = getResponse(path + basicAddress, identifier);

        //then
        validateResponse(response);
    }

    @Test
    @DisplayName("keyword 테스트")
    void keyword() {
        // given
        String basicKeyword = "루터회관";
        String path = "api/locations/search?keyword=";
        String identifier = "keyword";

        // when
        ExtractableResponse<Response> response
            = getResponse(path + basicKeyword, identifier);

        // then
        validateResponse(response);
    }

    @Test
    @DisplayName("axis 테스트")
    void axis() {
        // given
        String axisX = "128.9139734910702";
        String axisY = "37.94772297221625";
        String path = "api/locations/address?x=" + axisX + "&y=" + axisY;
        String identifier = "axis";

        // when
        ExtractableResponse<Response> response = getResponse(path, identifier);

        // then
        validateResponse(response);
    }

    @Test
    @DisplayName("category 테스트")
    void category() {
        // given
        String category = "카페";
        String xAxis = "126.895318461208";
        String yAxis = "37.4798477003537";
        String path = "/api/locations/utility/" + category + "?x=" + xAxis + "&y=" + yAxis;
        String identifier = "utility";

        // when
        ExtractableResponse<Response> response
            = getResponse(path, identifier);

        // then
        validateResponse(response);
    }

    @Test
    @DisplayName("category 실패 테스트")
    void categoryFail() {
        //given
        String category = "없는거넣으면에러";
        String xAxis = "126.895318461208";
        String yAxis = "37.4798477003537";
        String path = "/api/locations/utility/" + category + "?x=" + xAxis + "&y=" + yAxis;

        //when
        ExtractableResponse<Response> response = RestAssured.given(this.spec).log().all()
            .accept(MediaType.APPLICATION_JSON_VALUE)
            .when().get(path)
            .then().extract();

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.BAD_REQUEST.value());
        ErrorResponse errorResponse = response.as(ErrorResponse.class);
        assertThat(errorResponse.getMessage())
            .isEqualTo(LocationExceptionSet.NOT_FOUND_CATEGORY.getMessage());
    }

    @Test
    @DisplayName("midPoint 테스트")
    void midPoint() {
        //given
        String path = "/api/locations/midPoint";
        LocationsDto locations = new LocationsDto();
        locations.add(new Point(126.93103838968054, 37.488456683299155));
        locations.add(new Point(126.8951914712376, 37.48025238823605));

        //when
        long beforeTime = System.currentTimeMillis();
        ExtractableResponse<Response> response = getPostResponse(path, locations);
        long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기

        long secDiffTime = (afterTime - beforeTime)/1000;
        System.out.println("time : " + secDiffTime);
        System.out.println(response.body().asString());
        //then
        validateResponse(response);
    }

    private void validateResponse(ExtractableResponse<Response> response) {
        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
        assertThat(response.body()).isNotNull();
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

    private ExtractableResponse<Response> getPostResponse(String path, LocationsDto locations) {
        return RestAssured.given(this.spec)
            .body(locations)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .filter(
                document("midPoint",
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .when().post(path)
            .then().extract();
    }
}
