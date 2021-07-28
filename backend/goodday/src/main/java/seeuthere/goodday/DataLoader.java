package seeuthere.goodday;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.dao.AddressRepository;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.FriendRequest;
import seeuthere.goodday.member.service.MemberService;

@Component
@Profile("test")
public class DataLoader implements CommandLineRunner {

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
    public void run(String... args) throws Exception {
        Member member = new Member("1234", "abcd", "와이비", "image");
        Address address = new Address("집", "서울특별시 어쩌구");
        memberRepository.save(member);
        member.addAddress(address);
        addressRepository.save(address);

        Member member2 = new Member("12", "ab", "멍토", "image2");
        Member member3 = new Member("123", "abc", "심바", "image3");
        Member member4 = new Member("1", "a", "하루", "image4");
        memberRepository.save(member2);
        memberRepository.save(member3);
        memberRepository.save(member4);

        System.out.println(jwtTokenProvider.createToken("1234"));

        memberService.addFriend("1234", new FriendRequest("12"));
        memberService.addFriend("1234", new FriendRequest("123"));
    }
}
