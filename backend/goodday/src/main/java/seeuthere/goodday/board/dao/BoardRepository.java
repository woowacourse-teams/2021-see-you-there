package seeuthere.goodday.board.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import seeuthere.goodday.board.domain.Board;

public interface BoardRepository extends JpaRepository<Board, Long> {

}
