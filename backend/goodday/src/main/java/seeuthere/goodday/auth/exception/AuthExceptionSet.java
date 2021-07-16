package seeuthere.goodday.auth.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum AuthExceptionSet implements CustomException {
    INVALID_TOKEN("유효하지 않은 토큰입니다", HttpStatus.UNAUTHORIZED.value()),
    NOT_FOUND_USER("존재하지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED.value());

    private final String message;
    private final int status;

    AuthExceptionSet(String message, int status) {
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
