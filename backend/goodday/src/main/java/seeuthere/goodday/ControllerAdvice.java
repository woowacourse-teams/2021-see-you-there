package seeuthere.goodday;

import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import seeuthere.goodday.exception.ErrorResponse;
import seeuthere.goodday.exception.GoodDayException;

@RestControllerAdvice
public class ControllerAdvice {

    private static final String MESSAGE = "예상치 못한 에러가 발생했습니다.";

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(GoodDayException.class)
    public ResponseEntity<ErrorResponse> handleGoodDayException(GoodDayException e) {
        logger.warn(e.getMessage());
        return ResponseEntity.status(e.getStatus())
            .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRunTimeException(RuntimeException e) {
        logger.error(e.toString());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(MESSAGE));
    }
}
