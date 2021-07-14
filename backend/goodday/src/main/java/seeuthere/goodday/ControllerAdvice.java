package seeuthere.goodday;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.exception.ErrorResponse;

@RestControllerAdvice
public class ControllerAdvice {

    @ExceptionHandler(GoodDayException.class)
    public ResponseEntity<ErrorResponse> handleGoodDayException(GoodDayException e) {
        return ResponseEntity.status(e.getStatus())
            .body(new ErrorResponse(e.getMessage()));
    }
}
