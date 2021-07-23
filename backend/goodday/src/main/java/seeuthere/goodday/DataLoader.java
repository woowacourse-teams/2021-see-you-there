package seeuthere.goodday;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Member;

@Component
@Profile("test")
public class DataLoader implements CommandLineRunner {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;

    public DataLoader(MemberRepository memberRepository,
        JwtTokenProvider jwtTokenProvider) {
        this.memberRepository = memberRepository;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void run(String... args) throws Exception {
        Member member = new Member("1234", "abcd", "와이비", "image");
        String token = jwtTokenProvider.createToken(member.getId());
        memberRepository.save(member);
    }
}
