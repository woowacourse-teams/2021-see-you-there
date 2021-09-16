package seeuthere.goodday.board.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import seeuthere.goodday.DataLoader;
import seeuthere.goodday.board.exception.BoardExceptionSet;
import seeuthere.goodday.exception.GoodDayException;

@DisplayName("BoardTest")
class BoardTest {

    private static Board board;

    @BeforeEach
    void setUp() {
        board = new Board("안녕하세요", "서비스 좋아요", BoardLabel.FIX,
            DataLoader.와이비);
    }

    @DisplayName("자신의 게시물인지 확인한다.")
    @Test
    void isNotMyBoard() {
        //when
        boolean isMine = board.isNotMyBoard(DataLoader.멍토);

        //then
        assertThat(isMine).isTrue();
    }

    @DisplayName("자신의 게시물인지 확인한다.")
    @Test
    void isMyBoard() {
        //when
        boolean isMine = board.isNotMyBoard(DataLoader.와이비);

        //then
        assertThat(isMine).isFalse();
    }

    @DisplayName("게시물의 내용을 업데이트를 한다.")
    @Test
    void updateBoard() {
        //given
        Board updatedBoard = new Board("접수됬네요", "서비스 좋아요", BoardLabel.FIX,
            DataLoader.와이비);

        //when
        board.updateBoard(updatedBoard);

        //then
        assertThat(board.getTitle()).isEqualTo("접수됬네요");
    }

    @DisplayName("댓글을 단다.")
    @Test
    void addComment() {
        //given
        String content = "댓글을 달았습니다.";
        Comment comment = new Comment(content, board, DataLoader.관리자와이비);

        //when
        board.addComment(comment);
        Comment enrolledComment = board.getComment();

        //then
        assertThat(enrolledComment.getContent()).isEqualTo(content);
    }

    @DisplayName("댓글이 달려있을때 댓글을 달면 에러가 발생한다..")
    @Test
    void addCommentWithExistException() {
        //given
        String content = "댓글을 달았습니다.";
        Comment comment = new Comment(content, board, DataLoader.관리자와이비);
        board.addComment(comment);

        //when
        assertThatThrownBy(() -> board.addComment(comment))
            .isInstanceOf(GoodDayException.class)
            .hasMessage(BoardExceptionSet.ALREADY_EXISTED_COMMENT.getMessage());
    }

    @DisplayName("댓글을 삭제한다.")
    @Test
    void deleteComment() {
        //given
        String content = "댓글을 달았습니다.";
        Comment comment = new Comment(content, board, DataLoader.관리자와이비);
        board.addComment(comment);

        //when
        board.deleteComment();

        //then
        assertThat(board.getComment()).isNull();
    }

    @DisplayName("댓글이 달려있는 게시판 수정 불가")
    @Test
    void validateUpdateBoard() {
        //when
        String content = "댓글을 달았습니다.";
        Comment comment = new Comment(content, board, DataLoader.관리자와이비);
        board.addComment(comment);

        //then
        assertThatThrownBy(()-> board.validateUpdateBoard())
            .isInstanceOf(GoodDayException.class)
            .hasMessage(BoardExceptionSet.FINISHED_ISSUE.getMessage());
    }

    @DisplayName("댓글이 달려있는 않다면 에러가 발생하지 않는다.")
    @Test
    void validateUpdateBoardWithNotExist() {
        assertThatCode(() -> board.validateUpdateBoard())
            .doesNotThrowAnyException();
    }
}