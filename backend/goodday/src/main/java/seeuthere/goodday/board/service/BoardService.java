package seeuthere.goodday.board.service;

import java.util.List;
import java.util.Objects;
import javax.transaction.Transactional;
import org.springframework.stereotype.Service;
import seeuthere.goodday.board.dao.BoardRepository;
import seeuthere.goodday.board.dao.CommentRepository;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.Comment;
import seeuthere.goodday.board.exception.BoardExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.domain.Admin;
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

    @Transactional
    public void addComment(Board board, Comment comment) {
        if (Objects.nonNull(board.getComment())) {
            throw new GoodDayException(BoardExceptionSet.ALREADY_EXISTED_COMMENT);
        }
        commentRepository.save(comment);
        board.addComment(comment);
    }

    @Transactional
    public void updateComment(long boardId, String content, Admin admin) {
        Board board = findBoardById(boardId);
        Comment comment = board.getComment();
        comment.update(content, admin);
    }

    @Transactional
    public void deleteComment(Long boardId) {
        Board board = findBoardById(boardId);
        board.deleteComment();
    }
}
