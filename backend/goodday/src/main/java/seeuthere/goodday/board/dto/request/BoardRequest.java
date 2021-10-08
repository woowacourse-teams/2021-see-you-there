package seeuthere.goodday.board.dto.request;

import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardType;
import seeuthere.goodday.member.domain.Member;

public class BoardRequest {

    private String title;
    private String content;
    private BoardType type;

    public BoardRequest() {

    }

    public BoardRequest(String title, String content, BoardType type) {
        this.title = title;
        this.content = content;
        this.type = type;
    }

    public Board toBoard(Member member) {
        return new Board(title, content, type, member);
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
}
