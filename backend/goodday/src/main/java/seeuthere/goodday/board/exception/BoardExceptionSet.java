package seeuthere.goodday.board.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum BoardExceptionSet implements CustomException {

    NOT_FOUND_BOARD("해당 게시물을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    UNAUTHORIZED_BOARD("해당 게시물의 작성자가 아닙니다.", HttpStatus.UNAUTHORIZED.value()),
    ALREADY_EXISTED_COMMENT("해당 게시물에 댓글이 이미 등록되어 있습니다.", HttpStatus.CONFLICT.value()),
    NO_CONTENT("게시물 혹은 댓글, 내용이 없습니다.", HttpStatus.BAD_REQUEST.value()),
    FINISHED_ISSUE("답변이 완료되어 수정,삭제가 불가능합니다.", HttpStatus.FORBIDDEN.value());

    private final String message;
    private final int status;

    BoardExceptionSet(String message, int status) {
        this.message = message;
        this.status = status;
    }

    @Override
    public String getMessage() {
        return message;
    }

    @Override
    public int getStatus() {
        return status;
    }
}
