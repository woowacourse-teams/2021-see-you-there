package seeuthere.goodday.member.exception;

import org.springframework.http.HttpStatus;
import seeuthere.goodday.exception.CustomException;

public enum MemberExceptionSet implements CustomException {
    INVALID_MEMBER("존재하지 않는 사용자입니다.", HttpStatus.BAD_REQUEST.value()),
    ALREADY_EXIST_MEMBER("이미 사용 중인 아이디입니다.", HttpStatus.BAD_REQUEST.value()),
    SELF_SEARCH("본인 아이디를 검색할 수 없습니다.", HttpStatus.BAD_REQUEST.value()),
    ALREADY_REQUEST_FRIEND("이미 요청을 보낸 상태이거나 친구입니다.", HttpStatus.BAD_REQUEST.value()),
    OPPONENT_ALREADY_REQUEST_FRIEND("이미 상대방으로부터 요청이 온 상태입니다.", HttpStatus.BAD_REQUEST.value()),
    INVALID_FRIEND_REQUEST("이미 처리되었거나 존재하지 않는 요청입니다.", HttpStatus.BAD_REQUEST.value()),
    NOT_ADMIN("관리자가 아닙니다.", HttpStatus.UNAUTHORIZED.value());

    private final String message;
    private final int status;

    MemberExceptionSet(String message, int status) {
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
