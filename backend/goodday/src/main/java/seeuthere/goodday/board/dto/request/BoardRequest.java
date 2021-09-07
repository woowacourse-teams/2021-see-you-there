package seeuthere.goodday.board.dto.request;

import seeuthere.goodday.board.domain.Board;
import seeuthere.goodday.board.domain.BoardLabel;
import seeuthere.goodday.member.domain.Member;

public class BoardRequest {

    private String title;
    private String content;
    private String label;

    public BoardRequest() {

    }

    public BoardRequest(String title, String content, String label) {
        this.title = title;
        this.content = content;
        this.label = label;
    }

    public Board toBoard(Member member) {
        BoardLabel boardLabel = BoardLabel.valueOf(label);
        return new Board(title, content, boardLabel, member);
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getLabel() {
        return label;
    }
}
