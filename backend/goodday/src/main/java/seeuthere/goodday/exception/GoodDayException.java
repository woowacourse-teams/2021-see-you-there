package seeuthere.goodday.exception;

public class GoodDayException extends RuntimeException {

    private final CustomException customException;

    public GoodDayException(CustomException customException) {
        this.customException = customException;
    }

    @Override
    public String getMessage() {
        return customException.getMessage();
    }

    public int getStatus() {
        return customException.getStatus();
    }
}
