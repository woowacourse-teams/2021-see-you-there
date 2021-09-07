package seeuthere.goodday.board.service;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import seeuthere.goodday.board.dao.BoardRepository;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.dto.request.BoardResponse;
import seeuthere.goodday.board.exception.BoardExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.domain.Member;

@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public BoardResponse save(Board board) {
        Board savedBoard = boardRepository.save(board);
        return new BoardResponse(savedBoard);
    }

    public List<Board> findAllWithPagination() {
        return null;
    }

    public BoardResponse findById(Long id) {
        Board board = getBoard(id);
        return new BoardResponse(board);
    }

    @Transactional
    public BoardResponse update(Long id, Member member, Board updateBoard) {
        Board board = checkedMyBoard(id, member);
        board.updateBoard(updateBoard);
        return new BoardResponse(board);
    }

    public void delete(Long id, Member member) {
        Board board = checkedMyBoard(id, member);
        boardRepository.delete(board);
    }

    private Board checkedMyBoard(Long id, Member member) {
        Board board = getBoard(id);
        if (board.isNotMyBoard(member)) {
            throw new GoodDayException(BoardExceptionSet.UNAUTHORIZED_BOARD);
        }
        return board;
    }

    private Board getBoard(Long id) {
        return boardRepository.findById(id)
            .orElseThrow(() -> new GoodDayException(BoardExceptionSet.NOT_FOUND_BOARD));
    }
}
