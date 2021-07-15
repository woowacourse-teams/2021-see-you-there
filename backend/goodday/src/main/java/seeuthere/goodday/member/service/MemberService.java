package seeuthere.goodday.member.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Member;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public void add(Member member) {
        memberRepository.save(member);
    }

    public Optional<Member> find(Integer id) {
        return memberRepository.findById(id);
    }
}
