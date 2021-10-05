package seeuthere.goodday.member.dao;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.member.domain.Admin;
import seeuthere.goodday.member.domain.Member;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    Optional<Admin> findAdminByMember(Member member);
}
