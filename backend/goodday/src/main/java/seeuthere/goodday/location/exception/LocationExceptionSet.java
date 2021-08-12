package seeuthere.goodday.location.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum LocationExceptionSet implements CustomException {

    INVALID_LOCATION("위치를 찾을 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    NOT_FOUND_CATEGORY("해당 카테고리는 존재하지 않습니다.", HttpStatus.BAD_REQUEST.value()),
    NOT_ENOUGH_LOCATION("중간 지점을 계산하기에는 장소 수가 적습니다.", HttpStatus.BAD_REQUEST.value()),
    NOT_FOUND_WEIGHT_STATION_FILE("가중치 역에 대한 정보를 찾을 수가 없습니다. 관리자에게 문의주세요.",
        HttpStatus.INTERNAL_SERVER_ERROR.value());

    private final String message;
    private final int status;

    LocationExceptionSet(String message, int status) {
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
