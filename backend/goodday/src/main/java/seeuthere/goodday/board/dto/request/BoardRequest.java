package seeuthere.goodday.board.dto.request;

import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardType;
import seeuthere.goodday.member.domain.Member;

public class BoardRequest {

    private String title;
    private String content;
    private BoardType label;

    public BoardRequest() {

    }

    public BoardRequest(String title, String content, BoardType label) {
        this.title = title;
        this.content = content;
        this.label = label;
    }

    public Board toBoard(Member member) {
        return new Board(title, content, label, member);
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public BoardType getLabel() {
        return label;
    }
}
