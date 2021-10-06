package seeuthere.goodday.config.converter;

public class ConverterException extends RuntimeException {

    private static final String MESSAGE = "암호화/복호화에 실패했습니다.";

    public ConverterException(Throwable cause) {
        super(cause);
    }

    @Override
    public String getMessage() {
        return MESSAGE;
    }
}
