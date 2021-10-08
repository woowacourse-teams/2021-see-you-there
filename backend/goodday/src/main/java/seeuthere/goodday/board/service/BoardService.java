package seeuthere.goodday.board.service;

import java.util.List;
import java.util.Objects;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.board.dao.BoardRepository;
import seeuthere.goodday.board.dao.CommentRepository;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardType;
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

    @Transactional(readOnly = true)
    public List<Board> findAllWithPagination(int pageNumber, int size, BoardType boardType) {
        if (boardType.equals(BoardType.ALL)) {
            Page<Board> boards = boardRepository.findAll(PageRequest.of(pageNumber - 1, size,
                Sort.by("id").descending()) );
            return boards.getContent();
        }
        Page<Board> boards = boardRepository.findByType(boardType,
            PageRequest.of(pageNumber - 1, size, Sort.by("id").descending()));
        return boards.getContent();
    }

    @Transactional(readOnly = true)
    public Board findBoardById(Long id) {
        return boardRepository.findById(id).
            orElseThrow(() -> new GoodDayException(BoardExceptionSet.NOT_FOUND_BOARD));
    }

    // todo - 답글 단 후에는 어드민만 수정 삭제 가능하게 처리하기

    @Transactional
    public Board updateBoard(Long id, Member member, Board updateBoard) {
        Board board = checkedMyBoard(id, member);
        board.updateBoard(updateBoard);
        return board;
    }

    public void deleteBoard(Long id, Member member) {
        Board board = checkedMyBoard(id, member);
        board.validateUpdateBoard();
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
        board.addComment(comment);
        commentRepository.save(comment);
    }

    @Transactional
    public void updateComment(long boardId, String content, Admin admin) {
        Board board = findBoardById(boardId);
        Comment comment = board.getComment();
        commentExistValidate(comment);
        comment.update(content, admin);
    }

    @Transactional
    public void deleteComment(Long boardId) {
        Board board = findBoardById(boardId);
        Comment comment = board.getComment();
        commentExistValidate(comment);
        board.deleteComment();
    }

    private void commentExistValidate(Comment comment) {
        if (Objects.isNull(comment)) {
            throw new GoodDayException(BoardExceptionSet.NO_CONTENT);
        }
    }
}
