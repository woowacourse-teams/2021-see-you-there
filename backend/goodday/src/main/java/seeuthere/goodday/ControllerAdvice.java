package seeuthere.goodday;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import seeuthere.goodday.config.converter.ConverterException;
import seeuthere.goodday.exception.ErrorResponse;
import seeuthere.goodday.exception.GoodDayException;

@RestControllerAdvice
public class ControllerAdvice {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(GoodDayException.class)
    public ResponseEntity<ErrorResponse> handleGoodDayException(GoodDayException e) {
        logger.warn("CustomException!!: ", e);
        return ResponseEntity.status(e.getStatus())
            .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(ConverterException.class)
    public ResponseEntity<ErrorResponse> handleConverterException(ConverterException e) {
        logger.warn("ConvertException!!: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse(e.getMessage()));
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRunTimeException(RuntimeException e) {
        logger.warn("RuntimeException!!: ", e);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
            .body(new ErrorResponse("예상치 못한 에러가 발생했습니다."));
    }
}
