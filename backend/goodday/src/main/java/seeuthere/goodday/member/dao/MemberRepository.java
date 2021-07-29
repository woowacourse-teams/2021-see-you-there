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

    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN TRUE ELSE FALSE END FROM Member m WHERE m.memberId = :memberId")
    boolean existsByMemberId(@Param("memberId") String memberId);

    @Query("SELECT m FROM Member m WHERE m.memberId = :memberId")
    Member findByMemberId(@Param("memberId") String memberId);
}
