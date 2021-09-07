package seeuthere.goodday.board.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum BoardExceptionSet implements CustomException {

    NOT_FOUND_BOARD("해당 게시물을 찾을 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    UNAUTHORIZED_BOARD("해당 게시물의 작성자가 아닙니다.", HttpStatus.UNAUTHORIZED.value());

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
