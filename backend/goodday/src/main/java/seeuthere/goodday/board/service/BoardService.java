package seeuthere.goodday.board.service;

import java.util.List;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import seeuthere.goodday.board.dao.BoardRepository;
import seeuthere.goodday.board.dao.CommentRepository;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.Comment;
import seeuthere.goodday.board.dto.request.BoardResponse;
import seeuthere.goodday.board.dto.request.CommentResponse;
import seeuthere.goodday.board.exception.BoardExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.domain.Member;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final CommentRepository commentRepository;

    public BoardService(BoardRepository boardRepository, CommentRepository commentRepository) {
        this.boardRepository = boardRepository;
        this.commentRepository = commentRepository;
    }

    public Board saveBoard(Board board) {
        return boardRepository.save(board);
    }

    public Comment saveComment(Comment comment) {
        Comment savedComment = commentRepository.save(comment);
        return savedComment;
    }

    public Comment findCommentByBoardId(Long boardId) {
        return commentRepository.findByBoardId(boardId)
            .orElseThrow(() -> new GoodDayException(BoardExceptionSet.NOT_FOUND_BOARD));
    }

    public List<Board> findAllWithPagination() {
        return null;
    }

    public Board findBoardById(Long id) {
        return boardRepository.findById(id).
            orElseThrow(() -> new GoodDayException(BoardExceptionSet.NOT_FOUND_BOARD));
    }

    @Transactional
    public Board updateBoard(Long id, Member member, Board updateBoard) {
        Board board = checkedMyBoard(id, member);
        board.updateBoard(updateBoard);
        return board;
    }

    public void deleteBoard(Long id, Member member) {
        Board board = checkedMyBoard(id, member);
        boardRepository.delete(board);
    }

    private Board checkedMyBoard(Long id, Member member) {
        Board board = findBoardById(id);
        if (board.isNotMyBoard(member)) {
            throw new GoodDayException(BoardExceptionSet.UNAUTHORIZED_BOARD);
        }
        return board;
    }
}
