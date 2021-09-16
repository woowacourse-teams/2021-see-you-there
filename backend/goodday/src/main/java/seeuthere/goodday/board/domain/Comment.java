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

    @OneToOne
    @JoinColumn(name = "ADMIN_ID")
    private Admin admin;

    public Comment() {

    }

    public Comment(String content, Board board, Admin admin) {
        validate(content);
        this.content = content;
        this.board = board;
        this.admin = admin;
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

    public Admin getAdmin() {
        return admin;
    }

    public void update(String content, Admin admin) {
        validate(content);
        this.content = content;
        this.admin = admin;
    }
}
