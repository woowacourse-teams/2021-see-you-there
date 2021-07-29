package seeuthere.goodday.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.CoreMatchers.is;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;
import static seeuthere.goodday.DataLoader.멍토;
import static seeuthere.goodday.DataLoader.심바;
import static seeuthere.goodday.DataLoader.와이비;
import static seeuthere.goodday.DataLoader.와이비집;
import static seeuthere.goodday.DataLoader.하루;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.AddressDeleteRequest;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.dto.AddressUpdateRequest;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.dto.FriendResponse;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.service.MemberService;

@DisplayName("멤버 관리 인수 테스트")
class MemberAcceptanceTest extends AcceptanceTest {

    private static String TOKEN;
    private static final String MEMBER_API_PATH = "/api/members";
    private static final String ADDRESS_API_PATH = MEMBER_API_PATH + "/address";
    private static final String FRIEND_API_PATH = MEMBER_API_PATH + "/friends";

    @Autowired
    MemberService memberService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @BeforeEach
    public void setUp() {
        TOKEN = jwtTokenProvider.createToken(와이비.getId());
    }

    @DisplayName("멤버 정보 가져오기")
    @Test
    void memberInfo() {
        ProfileResponse response = getResponse("member/info", MEMBER_API_PATH)
            .as(ProfileResponse.class);

        assertThat(response.getNickname()).isEqualTo(와이비.getName());
    }

    @DisplayName("멤버 수정 테스트")
    @Test
    public void memberUpdate() {
        MemberRequest request = new MemberRequest("달라진 와이비", "changedImage", 와이비.getMemberId());

        putResponse("member/update", MEMBER_API_PATH, request);

        Member member = memberService.find(와이비.getId());
        assertThat(member.getName()).isEqualTo(request.getName());
        assertThat(member.getProfileImage()).isEqualTo(request.getProfileImage());
        assertThat(member.getMemberId()).isEqualTo(request.getMemberId());
    }

    @DisplayName("멤버의 주소를 조회한다.")
    @Test
    public void getAddress() {
        List<AddressResponse> responses = getResponse("member/address-info", ADDRESS_API_PATH)
            .body().jsonPath().getList(".", AddressResponse.class);

        assertThat(responses.size()).isEqualTo(1);
        assertThat(responses.get(0).getName()).isEqualTo(와이비집.getName());
        assertThat(responses.get(0).getAddress()).isEqualTo(와이비집.getAddress());
    }

    @DisplayName("멤버의 주소를 추가한다")
    @Test
    @Transactional
    public void addAddress() {
        AddressRequest request = new AddressRequest("회사", "서울시 송파구");
        postResponse("member/address-add", ADDRESS_API_PATH,
            request)
            .as(AddressResponse.class);

        Member member = memberService.find(와이비.getId());
        Address expectAddress = member.getAddresses().stream()
            .filter(a -> a.getName().equals(request.getName()))
            .findFirst()
            .orElseThrow();

        assertThat(expectAddress.getId()).isEqualTo(2L);
        assertThat(expectAddress.getName()).isEqualTo(request.getName());
        assertThat(expectAddress.getAddress()).isEqualTo(request.getAddress());
    }

    @DisplayName("멤버의 주소를 수정한다.")
    @Test
    public void updateAddress() {
        AddressUpdateRequest request = new AddressUpdateRequest(1L, "이사간 집", "이사간 주소");
        AddressResponse response = putResponse("member/address-update", ADDRESS_API_PATH, request)
            .as(AddressResponse.class);

        assertThat(response.getId()).isEqualTo(request.getId());
        assertThat(response.getName()).isEqualTo(request.getName());
        assertThat(response.getAddress()).isEqualTo(request.getAddress());
    }

    @DisplayName("멤버의 주소를 삭제한다.")
    @Test
    public void deleteAddress() {
        AddressDeleteRequest addressDeleteRequest = new AddressDeleteRequest(1L);

        deleteResponse("member/address-delete", ADDRESS_API_PATH, addressDeleteRequest);
    }

    @DisplayName("멤버의 친구를 추가한다.")
    @Test
    public void addFriend() {
        FriendRequest request = new FriendRequest(하루.getMemberId());

        FriendResponse response = postResponse("member/friend-add", FRIEND_API_PATH, request)
            .as(FriendResponse.class);

        assertThat(response.getNickname()).isEqualTo(하루.getName());
        assertThat(response.getProfileImage()).isEqualTo(하루.getProfileImage());
    }

    @DisplayName("멤버의 친구를 조회한다.")
    @Test
    public void findFriends() {
        List<FriendResponse> response = getResponse("member/friend-find", FRIEND_API_PATH).body()
            .jsonPath()
            .getList(".", FriendResponse.class);

        assertThat(response.size()).isEqualTo(2);
        assertThat(response.stream()
            .map(FriendResponse::getNickname)
            .collect(Collectors.toList())
            .containsAll(Arrays.asList(멍토.getName(), 심바.getName()))).isTrue();
    }

    @DisplayName("멤버의 친구를 삭제한다.")
    @Test
    @Transactional
    public void deleteFriend() {
        FriendRequest request = new FriendRequest(멍토.getMemberId());
        deleteResponse("member/friend-delete", FRIEND_API_PATH, request);

        Member findMember = memberService.find(와이비.getId());

        assertThat(findMember.getMemberFriends().size()).isEqualTo(1);
        assertThat(findMember.getMemberFriends().stream()
            .map(Member::getName)
            .collect(Collectors.toList()).contains(멍토.getName())).isFalse();
    }

    private ExtractableResponse<Response> getResponse(String identifier, String path) {
        return makeResponse(identifier).get(path)
            .then().statusCode(is(200))
            .extract();
    }

    private ExtractableResponse<Response> putResponse(String identifier, String path,
        Object request) {
        return makeResponse(identifier)
            .body(request)
            .when().put(path)
            .then().assertThat().statusCode(is(200))
            .extract();
    }

    private ExtractableResponse<Response> postResponse(String identifier, String path,
        Object request) {
        return makeResponse(identifier)
            .body(request)
            .when().post(path)
            .then().assertThat().statusCode(is(200))
            .extract();
    }

    private void deleteResponse(String identifier, String path, Object request) {
        makeResponse(identifier).body(request)
            .when().delete(path)
            .then().statusCode(is(204));
    }

    private RequestSpecification makeResponse(String identifier) {
        return RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .header("Authorization", "Bearer " + TOKEN)
            .contentType(MediaType.APPLICATION_JSON_VALUE);
    }
}
