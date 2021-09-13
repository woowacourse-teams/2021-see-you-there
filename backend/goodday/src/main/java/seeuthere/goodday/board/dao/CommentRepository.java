package seeuthere.goodday.board.dao;

import java.util.Optional;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.board.domain.Comment;

@Transactional
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    Optional<Comment> findByBoardId(Long id);
}
