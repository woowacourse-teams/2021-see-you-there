package seeuthere.goodday.member.service;

import java.util.Optional;
import org.springframework.stereotype.Service;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Member;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member add(ProfileDto profile) {
        if (!memberRepository.existsById(profile.getId())) {
            return memberRepository.save(
                new Member(profile.getId(), profile.getNickname(), profile.getProfileImage()));
        }
        return null;
    }

    public Member find(String id) {
        Optional<Member> member = memberRepository.findById(id);
        if (member.isEmpty()) {
            throw new GoodDayException(AuthExceptionSet.NOT_FOUND_USER);
        }

        return member.get();
    }
}
