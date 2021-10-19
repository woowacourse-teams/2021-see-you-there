package seeuthere.goodday.member.controller;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertAll;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessRequest;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.preprocessResponse;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;
import static org.springframework.restdocs.restassured3.RestAssuredRestDocumentation.document;

import io.restassured.RestAssured;
import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.apache.http.HttpHeaders;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.TestMethod;
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

    @Autowired
    private MemberService memberService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    private Member member;
    private String token;

    @BeforeEach
    void setup() {
        member = saveMember();
        token = jwtTokenProvider.createToken(member.getId());
        saveAddress();
    }

    @DisplayName("멤버 정보 가져오기")
    @Test
    void memberInfo() {
        ProfileResponse response =
            makeResponse(MEMBER_API_PATH, TestMethod.GET, token, "member/info")
                .as(ProfileResponse.class);

        assertThat(response.getNickname()).isEqualTo(member.getNickname());
    }

    @DisplayName("멤버 수정 테스트")
    @Test
    void memberUpdate() {
        MemberRequest request =
            new MemberRequest("달라진 와이비", "changedImage", member.getMemberId());

        makeResponse(MEMBER_API_PATH, TestMethod.PUT, token, request, "member/update");

        Member findMember = memberService.find(member.getId());
        assertThat(findMember.getNickname()).isEqualTo(request.getNickname());
        assertThat(findMember.getProfileImage()).isEqualTo(request.getProfileImage());
        assertThat(findMember.getMemberId()).isEqualTo(request.getMemberId());
    }

    @DisplayName("멤버의 주소를 조회한다.")
    @Test
    void getAddress() {
        List<AddressResponse> responses = makeResponse(ADDRESS_API_PATH, TestMethod.GET, token,
            "member/address-info")
            .body().jsonPath().getList(".", AddressResponse.class);

        assertAll(
            () -> assertThat(responses.size()).isEqualTo(1),
            () -> assertThat(responses.get(0).getNickname()).isEqualTo("test"),
            () -> assertThat(responses.get(0).getAddressName()).isEqualTo("test")
        );
    }

    @DisplayName("멤버의 주소를 추가")
    @Test
    void addAddress() {
        AddressRequest request = new AddressRequest("회사",
            "서울시 송파구", "서울시 송파구 어쩌구", 123.33, 567.89);

        makeResponse(ADDRESS_API_PATH, TestMethod.POST, token, request, "member/address-add");

        final AddressResponse expectedAddress = memberService.findAddress(member.getId()).stream()
            .filter(a -> a.getNickname().equals(request.getNickname()))
            .findFirst()
            .orElseThrow(RuntimeException::new);

        assertAll(
            () -> assertThat(memberService.findAddress(member.getId()).size()).isEqualTo(2),
            () -> assertThat(expectedAddress.getNickname()).isEqualTo(request.getNickname()),
            () -> assertThat(expectedAddress.getAddressName()).isEqualTo(request.getAddressName())
        );
    }

    @DisplayName("멤버의 주소를 수정한다.")
    @Test
    void updateAddress() {
        Member findMember = memberService.find(member.getId());
        Address address = findMember.getAddresses().get(0);

        AddressUpdateRequest request = new AddressUpdateRequest(
            address.getId(), "이사간 집", "이사간 주소",
            "이사간 주소 디테일", 123.4, 123.7);

        AddressResponse response =
            makeResponse(ADDRESS_API_PATH, TestMethod.PUT, token, request, "member/address-update")
                .as(AddressResponse.class);

        assertAll(
            () -> assertThat(response.getId()).isEqualTo(request.getId()),
            () -> assertThat(response.getNickname()).isEqualTo(request.getNickname()),
            () -> assertThat(response.getAddressName()).isEqualTo(request.getAddressName())
        );
    }

    @DisplayName("멤버의 주소를 삭제한다.")
    @Test
    void deleteAddress() {
        final AddressResponse addressResponse = memberService.findAddress(member.getId()).get(0);
        AddressDeleteRequest request = new AddressDeleteRequest(addressResponse.getId());
        ExtractableResponse<Response> response = makeResponse(ADDRESS_API_PATH,
            TestMethod.DELETE, token, request, "member/address-delete");

        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @DisplayName("멤버의 친구를 조회한다.")
    @Test
    void findFriends() {
        Member friendMember = addFriend();

        List<FriendResponse> response = makeResponse(FRIEND_API_PATH,
            TestMethod.GET, token, "member/friend-find")
            .body()
            .jsonPath()
            .getList(".", FriendResponse.class);

        assertThat(response.size()).isEqualTo(1);
        assertThat(response.stream()
            .map(FriendResponse::getNickname)
            .collect(Collectors.toList())
            .containsAll(Arrays.asList(friendMember.getNickname()))).isTrue();
    }

    @DisplayName("멤버의 친구를 삭제한다.")
    @Test
    void deleteFriend() {
        Member friendMember = addFriend();

        FriendRequest request = new FriendRequest(friendMember.getMemberId());
        makeResponse(FRIEND_API_PATH, TestMethod.DELETE, token,
            request, "member/friend-delete");

        Member findMember = memberService.find(member.getId());

        assertThat(findMember.getMemberFriends().size()).isZero();
    }

    @DisplayName("추가할 친구를 검색한다")
    @Test
    void searchFriend() {
        String searchWord = "a";
        String identifier = "member/friend-search";

        MemberResponse response = RestAssured.given(super.spec)
            .filter(
                document(identifier,
                    preprocessRequest(prettyPrint()),
                    preprocessResponse(prettyPrint())
                )
            )
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
            .contentType(MediaType.APPLICATION_JSON_VALUE)
            .param("searchWord", searchWord)
            .when().get(FRIEND_API_PATH + "/search")
            .then()
            .extract()
            .as(MemberResponse.class);

        assertThat(response.getMemberId()).isEqualTo(searchWord);
    }


    @DisplayName("내가 요청한 목록을 불러온다.")
    @Test
    void getReceiveFriends() {
        Member friendMember = createRequestFriend();

        List<RequestFriendResponse> responses = makeResponse(FRIEND_API_PATH + "/requestList",
            TestMethod.GET, token, "member/requester-list")
            .body().jsonPath().getList(".", RequestFriendResponse.class);

        assertThat(responses.size()).isEqualTo(1);
        assertThat(responses.get(0).getReceiver().getNickname()).isEqualTo(friendMember.getNickname());
    }

    @DisplayName("친구 요청을 한다.")
    @Test
    void requestFriend() {
        String identifier = "member/request";
        String path = FRIEND_API_PATH + "/request";
        String randomMemberId = memberService.createRandomMemberId();
        ProfileResponse profileResponse = new ProfileResponse(randomMemberId, randomMemberId,
            "프렌드닉네임",  "testProfileImage");
        Member friendMember = memberService.add(profileResponse);

        FriendRequest request = new FriendRequest(friendMember.getMemberId());
        ExtractableResponse<Response> response = makeResponse(path,
            TestMethod.POST, token, request, identifier);

        assertThat(response.statusCode()).isEqualTo(HttpStatus.OK.value());
    }

    @DisplayName("나에게 온 친구 요청을 수락한다.")
    @Test
    void acceptFriend() {
        String identifier = "member/acceptance";
        String path = FRIEND_API_PATH + "/acceptance";
        Member friendCandidate = createRequestFriend();
        String candidateToken = jwtTokenProvider.createToken(friendCandidate.getId());

        List<RequestFriendResponse> requestFriends = memberService.findReceiveFriends(friendCandidate.getId());
        RequestFriendRequest request = new RequestFriendRequest(requestFriends.get(0).getId());

        makeResponse(path, TestMethod.POST, candidateToken, request, identifier);

        assertThat(memberService.findFriends(friendCandidate.getId()).size()).isEqualTo(1);
        assertThat(memberService.findFriends(friendCandidate.getId()).stream()
            .map(FriendResponse::getNickname)
            .collect(Collectors.toList())
        ).containsExactlyInAnyOrder(member.getNickname());
    }

    @DisplayName("나에게 온 친구 요청을 거절한다.")
    @Test
    void refuseFriend() {
        String identifier = "member/refuse";
        String path = FRIEND_API_PATH + "/refuse";
        Member friendCandidate = createRequestFriend();
        String candidateToken = jwtTokenProvider.createToken(friendCandidate.getId());

        List<RequestFriendResponse> requestFriends = memberService.findReceiveFriends(friendCandidate.getId());
        RequestFriendRequest request = new RequestFriendRequest(requestFriends.get(0).getId());
        makeResponse(path, TestMethod.POST, candidateToken, request, identifier);

        assertThat(memberService.findFriends(friendCandidate.getId()).size()).isEqualTo(0);
    }

    @DisplayName("내가 보낸 요청을 취소한다.")
    @Test
    void requestCancel() {
        String identifier = "request/cancel";
        String path = FRIEND_API_PATH + "/request/cancel";
        createRequestFriend();

        List<RequestFriendResponse> requestFriends = memberService.findRequestFriends(member.getId());
        RequestFriendRequest request = new RequestFriendRequest(requestFriends.get(0).getId());
        makeResponse(path, TestMethod.POST, token, request, identifier);

        assertThat(memberService.findFriends(member.getId()).size()).isZero();
        assertThat(memberService.findRequestFriends(member.getId()).size()).isZero();
    }

    private Member saveMember() {
        String randomMemberId = memberService.createRandomMemberId();
        ProfileResponse profileResponse = new ProfileResponse(randomMemberId, randomMemberId,
            "테스트닉네임",
            "testProfileImage");
        return memberService.add(profileResponse);
    }

    private void saveAddress() {
        AddressRequest addressRequest = new AddressRequest("test", "test", "test", 100.0, 100.0);
        memberService.addAddress(member.getId(), addressRequest);
    }

    private Member addFriend() {
        Member friendMember = createRequestFriend();
        acceptFriend(friendMember);
        return friendMember;
    }

    private Member createRequestFriend() {
        String randomMemberId = memberService.createRandomMemberId();
        ProfileResponse profileResponse = new ProfileResponse(randomMemberId, randomMemberId,
            "프렌드닉네임",  "testProfileImage");
        Member friendMember = memberService.add(profileResponse);

        FriendRequest request = new FriendRequest(friendMember.getMemberId());
        memberService.requestFriend(member.getId(), request);
        return friendMember;
    }

    private void acceptFriend(Member friendMember) {
        List<RequestFriendResponse> requestFriends = memberService.findReceiveFriends(friendMember.getId());
        requestFriends.stream()
            .map(RequestFriendResponse::getId)
            .forEach(id -> memberService.acceptFriend(friendMember.getId(), new RequestFriendRequest(id)));
    }
}
