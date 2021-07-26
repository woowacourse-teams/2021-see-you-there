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
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.service.MemberService;


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

        ProfileDto response = getResponse("member/info", path, token)
            .as(ProfileDto.class);

        assertThat(response.getNickname()).isEqualTo("와이비");
    }

    @DisplayName("멤버 수정 테스트")
    @Test
    public void memberUpdate() {
        String path = "/api/members";

        MemberRequest memberRequest = new MemberRequest("name", "changedImage", "123454");
        String token = jwtTokenProvider.createToken("1234");

        getPutResponse("/member/update", path, memberRequest, token);

        Member member = memberService.find("1234");
        assertThat(member.getName()).isEqualTo("name");
        assertThat(member.getProfileImage()).isEqualTo("changedImage");
        assertThat(member.getMemberId()).isEqualTo("123454");
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

    private void getPutResponse(String identifier, String path, MemberRequest memberRequest,
        String token) {
        RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .body(memberRequest)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when().put(path)
            .then().assertThat().statusCode(is(200));
    }
}
