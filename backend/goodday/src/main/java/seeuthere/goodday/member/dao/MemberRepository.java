package seeuthere.goodday.member.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import seeuthere.goodday.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {

}
