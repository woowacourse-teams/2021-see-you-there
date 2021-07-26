package seeuthere.goodday;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.dao.AddressRepository;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Address;
import seeuthere.goodday.member.domain.Member;

@Component
@Profile("test")
public class DataLoader implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public DataLoader(MemberRepository memberRepository,
        AddressRepository addressRepository,
        JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.addressRepository = addressRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void run(String... args) throws Exception {
        Member member = new Member("1234", "abcd", "와이비", "image");
        Address address = new Address("집", "서울특별시 어쩌구");
        memberRepository.save(member);
        member.addAddress(address);
        addressRepository.save(address);

        String token = jwtTokenProvider.createToken(member.getId());
        System.out.println(token);
    }
}
