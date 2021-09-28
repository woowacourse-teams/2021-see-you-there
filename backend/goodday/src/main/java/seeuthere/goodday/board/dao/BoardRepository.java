package seeuthere.goodday.board.dao;

import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardLabel;

@Transactional
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findByLabel(BoardLabel label, Pageable pageable);
}
