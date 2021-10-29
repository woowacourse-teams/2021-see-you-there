package seeuthere.goodday.board.dao;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardType;

@Transactional
@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {

    Page<Board> findByType(BoardType type, Pageable pageable);

    @Query("SELECT b FROM Board b WHERE b.id < :lastBoardId order by b.id desc")
    Page<Board> findAllByPagination(@Param("lastBoardId") long lastBoardId, Pageable pageable);

    @Query("SELECT b FROM Board b WHERE b.id < :lastBoardId AND b.type = :boardType ORDER BY b.id desc")
    Page<Board> findByTypePagination(@Param("lastBoardId") long lastBoardId, @Param("boardType") BoardType boardType, Pageable pageable);
}
