package seeuthere.goodday.board.domain;

import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import seeuthere.goodday.board.exception.BoardExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.domain.Admin;

@Entity
public class Comment {

    private static final int MIN_SIZE = 2;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createTime;

    @UpdateTimestamp
    private LocalDateTime updateTime;

    private String content;

    @OneToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    public Comment() {
    }

    public Comment(String content, Board board) {
        validate(content);
        this.content = content;
        this.board = board;
    }

    private void validate(String content) {
        if (Objects.isNull(content) || content.length() <= MIN_SIZE) {
            throw new GoodDayException(BoardExceptionSet.NO_CONTENT);
        }
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

    public String getContent() {
        return content;
    }

    public Board getBoard() {
        return board;
    }

    public void update(String content) {
        validate(content);
        this.content = content;
    }
}
