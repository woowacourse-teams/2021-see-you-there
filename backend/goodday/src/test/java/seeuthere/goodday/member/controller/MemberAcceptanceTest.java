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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import seeuthere.goodday.member.dto.MemberResponse;
import seeuthere.goodday.member.dto.RequestFriendRequest;
import seeuthere.goodday.member.dto.RequestFriendResponse;
import seeuthere.goodday.member.service.MemberService;

@DisplayName("멤버 관리 인수 테스트")
class MemberAcceptanceTest extends AcceptanceTest {

    private static final String MEMBER_API_PATH = "/api/members";
    private static final String ADDRESS_API_PATH = MEMBER_API_PATH + "/address";
    private static final String FRIEND_API_PATH = MEMBER_API_PATH + "/friends";
    private static String TOKEN;
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

        assertThat(response.getNickname()).isEqualTo(와이비.getNickname());
    }

    @DisplayName("멤버 수정 테스트")
    @Test
    public void memberUpdate() {
        MemberRequest request =
            new MemberRequest("달라진 와이비", "changedImage", 와이비.getMemberId());

        putResponse("member/update", MEMBER_API_PATH, request);

        Member member = memberService.find(와이비.getId());
        assertThat(member.getNickname()).isEqualTo(request.getNickname());
        assertThat(member.getProfileImage()).isEqualTo(request.getProfileImage());
        assertThat(member.getMemberId()).isEqualTo(request.getMemberId());
    }

    @DisplayName("멤버의 주소를 조회한다.")
    @Test
    public void getAddress() {
        List<AddressResponse> responses =
            getResponse("member/address-info", ADDRESS_API_PATH)
                .body().jsonPath().getList(".", AddressResponse.class);

        assertThat(responses.size()).isEqualTo(1);
        assertThat(responses.get(0).getNickname()).isEqualTo(와이비집.getNickname());
        assertThat(responses.get(0).getAddressName()).isEqualTo(와이비집.getAddressName());
    }

    @DisplayName("멤버의 주소를 추가한다")
    @Test
    @Transactional
    public void addAddress() {
        AddressRequest request = new AddressRequest("회사",
            "서울시 송파구", "서울시 송파구 어쩌구", 123.33, 567.89);
        postResponse("member/address-add", ADDRESS_API_PATH,
            request)
            .as(AddressResponse.class);
        Member member = memberService.find(와이비.getId());

        Address expectAddress = member.getAddresses().stream()
            .filter(a -> a.getNickname().equals(request.getNickname()))
            .findFirst()
            .orElseThrow();

        assertThat(member.getAddresses().size()).isEqualTo(2);
        assertThat(expectAddress.getNickname()).isEqualTo(request.getNickname());
        assertThat(expectAddress.getAddressName()).isEqualTo(request.getAddressName());
    }

    @DisplayName("멤버의 주소를 수정한다.")
    @Test
    public void updateAddress() {
        AddressUpdateRequest request = new AddressUpdateRequest(
            1L, "이사간 집", "이사간 주소",
            "이사간 주소 디테일", 123.4, 123.7);
        AddressResponse response = putResponse("member/address-update", ADDRESS_API_PATH, request)
            .as(AddressResponse.class);

        assertThat(response.getId()).isEqualTo(request.getId());
        assertThat(response.getNickname()).isEqualTo(request.getNickname());
        assertThat(response.getAddressName()).isEqualTo(request.getAddressName());
    }

    @DisplayName("멤버의 주소를 삭제한다.")
    @Test
    public void deleteAddress() {
        AddressDeleteRequest addressDeleteRequest = new AddressDeleteRequest(1L);

        deleteResponse("member/address-delete", ADDRESS_API_PATH, addressDeleteRequest);
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
            .containsAll(Arrays.asList(멍토.getNickname(), 심바.getNickname()))).isTrue();
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
            .map(Member::getNickname)
            .collect(Collectors.toList()).contains(멍토.getNickname())).isFalse();
    }

    @DisplayName("추가할 친구를 검색한다")
    @Test
    public void searchFriend() {

        String identifier = "member/friend-search";
        List<MemberResponse> response = makeResponse(identifier)
            .param("searchWord", "a")
            .when().get(FRIEND_API_PATH + "/search")
            .then().statusCode(is(HttpStatus.OK.value()))
            .extract().body().jsonPath().getList(".", MemberResponse.class);

        assertThat(response.stream()
            .map(MemberResponse::getMemberId)
            .collect(Collectors.toList()))
            .containsExactly("a", "ab", "abc");
    }

    @DisplayName("나에게 들어온 요청 목록을 불러온다.")
    @Test
    void getRequestFriends() {
        String identifier = "member/requester-list";
        String path = "/api/members/friends/requestList";
        List<RequestFriendResponse> response = getResponse(identifier, path)
            .body().jsonPath().getList(".", RequestFriendResponse.class);

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.get(0).getRequester().getNickname()).isEqualTo(하루.getNickname());
    }

    @DisplayName("내가 요청한 목록을 불러온다.")
    @Test
    void getReceiveFriends() {
        String token = jwtTokenProvider.createToken(하루.getId());
        String path = "/api/members/friends/receiveList";
        String identifier = "member/receiver-list";
        List<RequestFriendResponse> responses = RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .get(path)
            .then().statusCode(is(HttpStatus.OK.value()))
            .extract().body().jsonPath().getList(".", RequestFriendResponse.class);

        assertThat(responses.size()).isEqualTo(1);
        assertThat(responses.get(0).getReceiver().getNickname()).isEqualTo(와이비.getNickname());
    }

    @DisplayName("친구 요청을 한다.")
    @Test
    void requestFriend() {
        String identifier = "member/request";
        String path = "/api/members/friends/request";
        String token = jwtTokenProvider.createToken(멍토.getId());
        FriendRequest request = new FriendRequest(심바.getMemberId());

        RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .body(request)
            .when().post(path)
            .then().statusCode(is(HttpStatus.OK.value()))
            .extract();
    }

    @DisplayName("나에게 온 친구 요청을 수락한다.")
    @Test
    void acceptFriend() {
        String identifier = "member/acceptance";
        String path = "/api/members/friends/acceptance";
        List<RequestFriendResponse> requestFriends = memberService.findRequestFriends(와이비.getId());
        RequestFriendRequest request = new RequestFriendRequest(requestFriends.get(0).getId());
        postResponse(identifier, path, request);

        assertThat(memberService.findFriends(와이비.getId()).size()).isEqualTo(3);
        assertThat(memberService.findFriends(와이비.getId()).stream()
            .map(FriendResponse::getNickname)
            .collect(Collectors.toList())
        ).containsExactlyInAnyOrder(멍토.getNickname(), 심바.getNickname(), 하루.getNickname());
    }

    @DisplayName("나에게 온 친구 요청을 거절한다.")
    @Test
    void refuseFriend() {
        String identifier = "member/refuse";
        String path = "/api/members/friends/refuse";
        List<RequestFriendResponse> requestFriends = memberService.findRequestFriends(와이비.getId());
        RequestFriendRequest request = new RequestFriendRequest(requestFriends.get(0).getId());
        postResponse(identifier, path, request);

        assertThat(memberService.findFriends(와이비.getId()).size()).isEqualTo(2);
        assertThat(memberService.findFriends(와이비.getId()).stream()
            .map(FriendResponse::getNickname)
            .collect(Collectors.toList())
        ).containsExactlyInAnyOrder(멍토.getNickname(), 심바.getNickname());
    }

    @DisplayName("내가 보낸 요청을 취소한다.")
    @Test
    void requestCancel() {
        String identifier = "member/cancel";
        String path = "/api/members/friends/request/cancel";
        List<RequestFriendResponse> requestFriends = memberService.findReceiveFriends(하루.getId());
        RequestFriendRequest request = new RequestFriendRequest(requestFriends.get(0).getId());
        postResponse(identifier, path, request);

        assertThat(memberService.findFriends(하루.getId()).size()).isEqualTo(0);
        assertThat(memberService.findFriends(와이비.getId()).size()).isEqualTo(2);
        assertThat(memberService.findReceiveFriends(하루.getId()).size()).isEqualTo(0);
    }

    private ExtractableResponse<Response> getResponse(String identifier, String path) {
        return makeResponse(identifier).get(path)
            .then().statusCode(is(HttpStatus.OK.value()))
            .extract();
    }

    private ExtractableResponse<Response> putResponse(String identifier, String path,
        Object request) {
        return makeResponse(identifier)
            .body(request)
            .when().put(path)
            .then().statusCode(is(HttpStatus.OK.value()))
            .extract();
    }

    private ExtractableResponse<Response> postResponse(String identifier, String path,
        Object request) {
        return makeResponse(identifier)
            .body(request)
            .when().post(path)
            .then().statusCode(is(HttpStatus.OK.value()))
            .extract();
    }

    private void deleteResponse(String identifier, String path, Object request) {
        makeResponse(identifier).body(request)
            .when().delete(path)
            .then().statusCode(is(HttpStatus.NO_CONTENT.value()));
    }

    private RequestSpecification makeResponse(String identifier) {
        return RestAssured.given(this.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + TOKEN)
            .contentType(MediaType.APPLICATION_JSON_VALUE);
    }
}
