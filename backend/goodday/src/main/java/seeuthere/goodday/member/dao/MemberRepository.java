package seeuthere.goodday.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.member.domain.Member;

@Transactional
@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

}
