package seeuthere.goodday.board.dto.request;

import java.time.LocalDateTime;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardLabel;

public class BoardResponse {

    private final Long id;
    private final String title;
    private final String content;
    private final LocalDateTime createTime;
    private final LocalDateTime updateTime;
    private final BoardLabel label;
    private final String memberId;
    private final CommentResponse commentResponse;

    public BoardResponse(Long id, String title, String content, LocalDateTime createTime,
        LocalDateTime updateTime, BoardLabel label, String memberId,
        CommentResponse commentResponse) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createTime = createTime;
        this.updateTime = updateTime;
        this.label = label;
        this.memberId = memberId;
        this.commentResponse = commentResponse;
    }

    public BoardResponse(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createTime = board.getCreateTime();
        this.updateTime = board.getUpdateTime();
        this.label = board.getLabel();
        this.memberId = board.getMember().getMemberId();
        this.commentResponse = CommentResponse.valueOf(board.getComment());
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public BoardLabel getLabel() {
        return label;
    }

    public String getMemberId() {
        return memberId;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public CommentResponse getCommentResponse() {
        return commentResponse;
    }
}
