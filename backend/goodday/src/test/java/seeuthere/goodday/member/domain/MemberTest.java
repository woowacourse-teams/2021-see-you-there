package seeuthere.goodday.member.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.auth.dto.ProfileResponse;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.AddressResponse;
import seeuthere.goodday.member.service.MemberService;


@DisplayName("멤버 관리를 한다.")
@SpringBootTest
@ActiveProfiles("test")
@Transactional
class MemberTest {

    @Autowired
    private MemberService memberService;

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
        AddressRequest request = new AddressRequest("회사", "서울시 송파구");
        AddressResponse addressResponse = memberService.addAddress("1234", request);

        Member findMember = memberService.find("1234");
        assertThat(findMember.getAddresses().size()).isEqualTo(2);
        assertThat(addressResponse.getName()).isEqualTo("회사");
    }

    @DisplayName("회원의 주소 목록을 불러온다")
    @Test
    void findAddress() {
        List<AddressResponse> addresses = memberService.findAddress("1234");

        assertThat(addresses.size()).isEqualTo(1);
        assertThat(addresses.get(0).getName()).isEqualTo("집");
    }
}
