package seeuthere.goodday.board.domain;

import java.time.LocalDateTime;
import java.util.Objects;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import seeuthere.goodday.board.exception.BoardExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.member.domain.Member;

@Entity
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createTime;

    @UpdateTimestamp
    private LocalDateTime updateTime;

    private String title;

    private String content;

    @Enumerated(value = EnumType.STRING)
    private BoardLabel label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToOne(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(nullable = true)
    private Comment comment;

    public Board() {
    }

    public Board(String title, String content, BoardLabel label, Member member) {
        this.title = title;
        this.content = content;
        this.label = label;
        this.member = member;
    }

    public boolean isNotMyBoard(Member member) {
        return !this.member.equals(member);
    }

    public void updateBoard(Board board) {
        this.title = board.getTitle();
        this.content = board.getContent();
        this.label = board.getLabel();
    }

    public void addComment(Comment comment) {
        if (Objects.isNull(comment)) {
            throw new GoodDayException(BoardExceptionSet.NO_CONTENT);
        }
        this.comment = comment;
    }

    public void deleteComment() {
        this.comment = null;
    }

    public void validateUpdateBoard() {
        if (Objects.nonNull(comment)) {
            throw new GoodDayException(BoardExceptionSet.FINISHED_ISSUE);
        }
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

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public LocalDateTime getUpdateTime() {
        return updateTime;
    }

    public Member getMember() {
        return member;
    }

    public Comment getComment() {
        return comment;
    }
}
