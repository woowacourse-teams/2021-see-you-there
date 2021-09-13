package seeuthere.goodday.board.dto.request;

import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.Comment;
import seeuthere.goodday.member.domain.Admin;

public class CommentRequest {

    private String content;

    public CommentRequest() {}

    public CommentRequest(String content) {
        this.content = content;
    }

    public Comment toComment(Board board, Admin admin) {
        return new Comment(content, board, admin);
    }

    public String getComment() {
        return this.content;
    }

}
