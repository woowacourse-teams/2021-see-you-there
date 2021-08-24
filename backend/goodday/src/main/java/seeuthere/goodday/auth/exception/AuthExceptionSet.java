package seeuthere.goodday.auth.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum AuthExceptionSet implements CustomException {

    INVALID_TOKEN("유효하지 않은 토큰입니다", HttpStatus.UNAUTHORIZED.value()),
    NOT_FOUND_USER("존재하지 않은 사용자입니다.", HttpStatus.UNAUTHORIZED.value()),
    KAKAO_CALLBACK("카카오와 인증시도 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    KAKAO_USER_INFO("카카오에서 정보를 가져오는 데 실패했습ㄴ다.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    NAVER_CALLBACK("네이버와 인증시도 중 오류가 발생했습니다.", HttpStatus.INTERNAL_SERVER_ERROR.value()),
    NAVER_USER_INFO("네이버에서 정보를 가져오는 데 실패했습ㄴ다.", HttpStatus.INTERNAL_SERVER_ERROR.value());

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
