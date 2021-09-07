package seeuthere.goodday.board.service;

import java.util.List;
import org.springframework.stereotype.Service;
import seeuthere.goodday.board.dao.BoardRepository;
import seeuthere.goodday.board.domain.Board;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board save(Board board) {
        return boardRepository.save(board);
    }

    public List<Board> findAllWithPagination() {
        return null;
    }

    public Board findById() {
        return null;
    }

    public Board update() {
        return null;
    }

    public void delete() {

    }

}
