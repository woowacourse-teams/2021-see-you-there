package seeuthere.goodday.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.AddressDeleteRequest;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.dto.AddressUpdateRequest;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.service.MemberService;

@DisplayName("멤버 관리 인수 테스트")
class MemberAcceptanceTest extends AcceptanceTest {

    @Autowired
    MemberService memberService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @DisplayName("멤버 정보 가져오기")
    @Test
    void memberInfo() {
        String path = "/api/members";
        String token = jwtTokenProvider.createToken("1234");

        ProfileResponse response = getResponse("member/info", path, token)
            .as(ProfileResponse.class);

        assertThat(response.getNickname()).isEqualTo("와이비");
    }

    @DisplayName("멤버 수정 테스트")
    @Test
    public void memberUpdate() {
        String path = "/api/members";

        MemberRequest memberRequest = new MemberRequest("name", "changedImage", "123454");
        String token = jwtTokenProvider.createToken("1234");

        putResponse("member/update", path, memberRequest, token);

        Member member = memberService.find("1234");
        assertThat(member.getName()).isEqualTo("name");
        assertThat(member.getProfileImage()).isEqualTo("changedImage");
        assertThat(member.getMemberId()).isEqualTo("123454");
    }

    @DisplayName("멤버의 주소를 조회한다.")
    @Test
    public void getAddress() {
        String path = "/api/members/address";
        String token = jwtTokenProvider.createToken("1234");

        List<AddressResponse> responses = getResponse("member/address-info", path, token)
            .body().jsonPath().getList(".", AddressResponse.class);

        assertThat(responses.size()).isEqualTo(1);
        assertThat(responses.get(0).getName()).isEqualTo("집");
        assertThat(responses.get(0).getAddress()).isEqualTo("서울특별시 어쩌구");
    }

    @DisplayName("멤버의 주소를 추가한다")
    @Test
    public void addAddress() {
        String path = "/api/members/address";
        String token = jwtTokenProvider.createToken("1234");

        AddressRequest addressRequest = new AddressRequest("회사", "서울시 송파구");
        AddressResponse addressResponse = postResponse("member/address-add", path, addressRequest,
            token)
            .as(AddressResponse.class);

        assertThat(addressResponse.getId()).isEqualTo(2L);
        assertThat(addressResponse.getName()).isEqualTo("회사");
        assertThat(addressResponse.getAddress()).isEqualTo("서울시 송파구");
    }

    @DisplayName("멤버의 주소를 수정한다.")
    @Test
    public void updateAddress() {
        String path = "api/members/address";
        String token = jwtTokenProvider.createToken("1234");

        AddressUpdateRequest request = new AddressUpdateRequest(1L, "이사간 집", "이사간 주소");
        AddressResponse response = putResponse("member/address-update", path, request, token)
            .as(AddressResponse.class);

        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getName()).isEqualTo("이사간 집");
        assertThat(response.getAddress()).isEqualTo("이사간 주소");
    }

    @DisplayName("멤버의 주소를 삭제한다.")
    @Test
    public void deleteAddress() {
        String path = "api/members/address";
        String token = jwtTokenProvider.createToken("1234");

        AddressDeleteRequest addressDeleteRequest = new AddressDeleteRequest(1L);

        deleteResponse("member/address-delete", path, addressDeleteRequest, token);
    }

    private void deleteResponse(String identifier, String path, Object request, String token) {
        RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .body(request)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().delete(path)
            .then().statusCode(is(204));
    }

    private ExtractableResponse<Response> getResponse(String identifier, String path,
        String token) {
        return RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .header("Authorization", "Bearer " + token)
            .when().get(path)
            .then().statusCode(is(200))
            .extract();
    }

    private ExtractableResponse<Response> putResponse(String identifier, String path,
        Object request,
        String token) {
        return RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .body(request)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().put(path)
            .then().assertThat().statusCode(is(200))
            .extract();
    }

    private ExtractableResponse<Response> postResponse(String identifier, String path,
        Object request,
        String token) {
        return RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .body(request)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().post(path)
            .then().assertThat().statusCode(is(200))
            .extract();
    }
}
