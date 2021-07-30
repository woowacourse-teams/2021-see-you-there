package seeuthere.goodday.path.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum PathExceptionSet implements CustomException {

    NOT_FOUND_PATH("해당 위치에서는 경로를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    OVER_WALK_TIME("이동할 수 있는 경로가 없습니다.", HttpStatus.BAD_REQUEST.value());

    private final String message;
    private final int status;

    PathExceptionSet(String message, int status) {
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
