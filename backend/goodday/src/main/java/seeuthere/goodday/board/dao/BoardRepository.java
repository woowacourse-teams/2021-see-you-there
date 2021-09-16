package seeuthere.goodday.board.dao;

import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.board.domain.Board;

@Transactional
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

}
