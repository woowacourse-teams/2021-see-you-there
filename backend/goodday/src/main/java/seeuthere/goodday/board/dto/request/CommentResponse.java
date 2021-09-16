package seeuthere.goodday.board.dto.request;

import java.time.LocalDateTime;
import java.util.Objects;
import seeuthere.goodday.board.domain.Comment;

public class CommentResponse {

    private final LocalDateTime createTime;
    private final LocalDateTime updateTime;
    private final String content;

    public CommentResponse(LocalDateTime createTime, LocalDateTime updateTime, String content) {
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.content = content;
    }

    public CommentResponse(Comment comment) {
        this.content = comment.getContent();
        this.createTime = comment.getCreateTime();
        this.updateTime = comment.getUpdateTime();

    }

    public static CommentResponse valueOf(Comment comment) {
        if (Objects.isNull(comment)) {
            return null;
        }
        return new CommentResponse(comment);
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public String getContent() {
        return content;
    }
}
