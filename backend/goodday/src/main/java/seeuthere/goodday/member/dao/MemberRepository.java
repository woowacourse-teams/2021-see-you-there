package seeuthere.goodday.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.member.domain.Member;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    boolean existsByMemberId(String memberId);

    Member findByMemberId(String memberId);
}
