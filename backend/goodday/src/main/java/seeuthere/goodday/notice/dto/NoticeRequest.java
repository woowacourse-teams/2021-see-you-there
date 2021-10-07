package seeuthere.goodday.notice.dto;

public class NoticeRequest {

    private String title;
    private String content;

    public NoticeRequest() {
    }

    public NoticeRequest(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }
}
