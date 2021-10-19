package seeuthere.goodday.notice.dto;

import java.time.LocalDateTime;
import seeuthere.goodday.notice.domain.Notice;

public class NoticeResponse {

    private Long id;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private String title;
    private String content;

    public NoticeResponse() {
    }

    public NoticeResponse(Notice notice) {
        this.id = notice.getId();
        this.createTime = notice.getCreateTime();
        this.updateTime = notice.getUpdateTime();
        this.title = notice.getTitle();
        this.content = notice.getContent();
    }

    public Long getId() {
        return id;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }
}
