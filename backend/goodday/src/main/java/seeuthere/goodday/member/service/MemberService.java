package seeuthere.goodday.member.service;

import java.util.Optional;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.auth.dto.ProfileDto;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.dao.MemberRepository;
import seeuthere.goodday.member.domain.Member;
import seeuthere.goodday.member.dto.MemberRequest;
import seeuthere.goodday.member.dto.MemberResponse;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member add(ProfileDto profile) {
        if (!memberRepository.existsById(profile.getId())) {
            String memberId = generateRandomMemberId();
            return memberRepository.save(
                new Member(profile.getId(), memberId, profile.getNickname(),
                    profile.getProfileImage()));
        }
        return null;
    }

    private String generateRandomMemberId() {
        String memberId = RandomStringUtils.randomAlphabetic(10);
        while (memberRepository.existsByMemberId(memberId)) {
            memberId = RandomStringUtils.randomAlphabetic(10);
        }
        return memberId;
    }

    public Member find(String id) {
        Optional<Member> member = memberRepository.findById(id);
        if (member.isEmpty()) {
            throw new GoodDayException(AuthExceptionSet.NOT_FOUND_USER);
        }
        return member.get();
    }

    @Transactional
    public MemberResponse updateMemberInfo(String id, MemberRequest request) {
        Member member = find(id);
        member.update(request);
        return new MemberResponse(member);
    }
}
