package seeuthere.goodday.notice.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.notice.domain.Notice;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    List<Notice> findAllByActive(boolean active);
}
