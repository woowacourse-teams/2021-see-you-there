package seeuthere.goodday.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;

import io.restassured.RestAssured;
import org.junit.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.service.MemberService;


class MemberAcceptanceTest extends AcceptanceTest {

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    MemberService memberService;

    @DisplayName("멤버 수정 테스트")
    @Test
    public void memberUpdate() {
        //given
        String path = "/api/members";

        MemberRequest memberRequest = new MemberRequest("name", "changedImage", "123454");
        String token = jwtTokenProvider.createToken("1234");

        // when
        RestAssured.given(this.spec)
            .body(memberRequest)
            .header("Authorization", "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .when()
                .post(path)
            .then().assertThat().statusCode(is(200));

        //then
        Member member = memberService.find("1234");
        assertThat(member.getName()).isEqualTo("name");
        assertThat(member.getProfileImage()).isEqualTo("changedImage");
        assertThat(member.getMemberId()).isEqualTo("123454");
    }
}