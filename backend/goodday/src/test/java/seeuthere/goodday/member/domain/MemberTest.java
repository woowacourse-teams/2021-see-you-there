package seeuthere.goodday.member.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static seeuthere.goodday.DataLoader.멍토;
import static seeuthere.goodday.DataLoader.심바;
import static seeuthere.goodday.DataLoader.와이비;
import static seeuthere.goodday.DataLoader.와이비집;
import static seeuthere.goodday.DataLoader.하루;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.member.dao.AddressRepository;
import seeuthere.goodday.member.dto.AddressDeleteRequest;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.dto.AddressUpdateRequest;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.dto.FriendResponse;
import seeuthere.goodday.member.dto.MemberResponse;
import seeuthere.goodday.member.service.MemberService;


@DisplayName("멤버 관리를 한다.")
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class MemberTest {

    @Autowired
    private MemberService memberService;

    @Autowired
    private AddressRepository addressRepository;

    @DisplayName("첫 로그인시 멤버를 저장한다.")
    @Test
    public void firstLoginSave() {
        ProfileResponse profile = new ProfileResponse("12345", "영범허", "imageLink");
        Member member = memberService.add(profile);
        assertThat(memberService.find("12345")).isEqualTo(member);
    }

    @DisplayName("첫 로그인이 아닐 시 멤버를 저장하지 않는다.")
    @Test
    public void alreadyMemberNotSave() {
        ProfileResponse profile = new ProfileResponse("12345", "영범허", "imageLink");
        memberService.add(profile);
        Member member = memberService.add(profile);
        assertThat(member).isNull();
    }

    @DisplayName("회원의 주소를 저장한다")
    @Test
    void addAddress() {
        AddressRequest request = new AddressRequest("회사", "루터회관", "서울시 송파구 루터회관", 123.12, 123.4);
        AddressResponse response = memberService.addAddress(와이비.getId(), request);

        Member findMember = memberService.find(와이비.getId());
        assertThat(findMember.getAddresses().size()).isEqualTo(2);
        assertThat(response.getNickname()).isEqualTo(request.getNickname());
    }

    @DisplayName("회원의 주소 목록을 불러온다")
    @Test
    void findAddress() {
        List<AddressResponse> addresses = memberService.findAddress(와이비.getId());

        assertThat(addresses.size()).isEqualTo(1);
        assertThat(addresses.get(0).getNickname()).isEqualTo(와이비집.getNickname());
    }

    @DisplayName("회원의 주소를 수정한다.")
    @Test
    void updateAddress() {
        AddressUpdateRequest request = new AddressUpdateRequest(1L, "이사간 집", "성남시 판교",
            "성남시 판교 이사간 집", 123.1, 23.1);
        memberService.updateAddress(와이비.getId(), request);

        List<AddressResponse> addresses = memberService.findAddress(와이비.getId());
        AddressResponse response = addresses.get(0);

        assertThat(response.getNickname()).isEqualTo("이사간 집");
        assertThat(response.getId()).isEqualTo(1L);
        assertThat(response.getAddressName()).isEqualTo("성남시 판교");
    }

    @DisplayName("회원의 주소를 삭제한다.")
    @Test
    void deleteAddress() {
        AddressDeleteRequest request = new AddressDeleteRequest(1L);
        memberService.deleteAddress(와이비.getId(), request);
        addressRepository.flush();

        List<AddressResponse> addresses = memberService.findAddress(와이비.getId());
        assertThat(addresses.size()).isEqualTo(0);
    }

    @DisplayName("친구를 추가한다.")
    @Test
    void addFriend() {
        FriendRequest request = new FriendRequest(하루.getMemberId());
        memberService.addFriend(와이비.getId(), request);

        Member member = memberService.find(와이비.getId());
        Member friendMember = memberService.find(하루.getId());

        assertThat(member.getFriends().size()).isEqualTo(3);
        assertThat(
            friendMember.getFriends().stream()
                .anyMatch(friendShip -> friendShip.getFriend().getId().equals(와이비.getId()))
        ).isTrue();
    }

    @DisplayName("친구를 조회한다")
    @Test
    void findFriends() {
        List<FriendResponse> friends = memberService.findFriends(와이비.getId());

        assertThat(friends.size()).isEqualTo(2);
        assertThat(friends.stream()
            .map(FriendResponse::getNickname)
            .collect(Collectors.toList()
            ).containsAll(Arrays.asList(심바.getName(), 멍토.getName()))).isTrue();
    }

    @DisplayName("친구를 삭제한다")
    @Test
    void deleteFriend() {
        memberService.deleteFriend(와이비.getId(), new FriendRequest(멍토.getMemberId()));

        Member member = memberService.find(와이비.getId());

        assertThat(member.getMemberFriends().size()).isEqualTo(1);
    }

    @DisplayName("추가할 친구를 검색한다.")
    @Test
    void searchFriend() {
        String aForAll = "a";
        List<MemberResponse> searchedMembers = memberService.searchFriend(와이비.getId(), aForAll);

        assertThat(searchedMembers.stream()
            .map(MemberResponse::getMemberId)
            .collect(Collectors.toList()))
            .containsExactly("a", "ab", "abc");
    }
}
