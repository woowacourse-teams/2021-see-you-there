package seeuthere.goodday;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.dao.AddressRepository;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.AddressRequest;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.service.MemberService;

@Component
@Profile("test")
public class DataLoader implements CommandLineRunner {

    public static final Member 와이비 = new Member("1234", "abcd", "와이비", "image");
    public static final Member 멍토 = new Member("12", "ab", "멍토", "image2");
    public static final Member 심바 = new Member("123", "abc", "심바", "image3");
    public static final Member 하루 = new Member("1", "a", "하루", "image4");
    public static final Address 와이비집 = new Address.Builder()
        .nickname("집")
        .addressName("어쩌구")
        .fullAddress("서울특별시 어쩌구")
        .x(123.123)
        .y(32.124)
        .build();

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final MemberService memberService;

    public DataLoader(MemberRepository memberRepository,
        AddressRepository addressRepository,
        JwtTokenProvider jwtTokenProvider, MemberService memberService) {
        this.memberRepository = memberRepository;
        this.addressRepository = addressRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.memberService = memberService;
    }

    @Override
    public void run(String... args) {
        memberRepository.save(와이비);
        memberService
            .addAddress(와이비.getId(), new AddressRequest(와이비집.getNickname(), 와이비집.getAddressName(),
                와이비집.getFullAddress(), 와이비집.getX(), 와이비집.getY()));
        memberRepository.save(멍토);
        memberRepository.save(심바);
        memberRepository.save(하루);

        memberService.addFriend(와이비.getId(), new FriendRequest(멍토.getMemberId()));
        memberService.addFriend(와이비.getId(), new FriendRequest(심바.getMemberId()));

        System.out.println("==================TOKEN=================\n"
            + jwtTokenProvider.createToken(와이비.getId()));
    }
}
