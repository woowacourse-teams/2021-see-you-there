package seeuthere.goodday.member.service;

import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Member;

import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member add(ProfileDto profile) {
        if (find(profile.getId()).isEmpty()) {
            return memberRepository.save(new Member(profile.getId(), profile.getNickname()));
        }
        return null;
    }

    public Optional<Member> find(String id) {
        return memberRepository.findById(id);
    }
}
