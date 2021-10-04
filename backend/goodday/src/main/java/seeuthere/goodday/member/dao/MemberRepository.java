package seeuthere.goodday.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.member.domain.Member;

@Transactional
@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

    boolean existsByMemberId(String memberId);

    Member findByMemberId(String memberId);

}
