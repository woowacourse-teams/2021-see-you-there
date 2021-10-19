package seeuthere.goodday.board.dto.response;

import java.time.LocalDateTime;
import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardType;

public class BoardResponse {

    private Long id;
    private String title;
    private String content;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
    private BoardType type;
    private String memberId;
    private CommentResponse commentResponse;

    public BoardResponse() {
    }

    public BoardResponse(Board board) {
        this.id = board.getId();
        this.title = board.getTitle();
        this.content = board.getContent();
        this.createTime = board.getCreateTime();
        this.updateTime = board.getUpdateTime();
        this.type = board.getType();
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

    public BoardType getType() {
        return type;
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
