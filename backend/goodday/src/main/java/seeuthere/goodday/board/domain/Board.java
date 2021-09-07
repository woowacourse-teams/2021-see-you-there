package seeuthere.goodday.board.domain;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import seeuthere.goodday.member.domain.Member;

@Entity
public class Board {

    @Id
    @GeneratedValue
    private Long id;

    private LocalDateTime createTime;

    private LocalDateTime updateTime;

    private String title;

    private String content;

    private BoardLabel label;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public Board() {
    }

    public Board(String title, String content, BoardLabel label, Member member) {
        this.createTime = LocalDateTime.now();
        this.updateTime = LocalDateTime.now();
        this.title = title;
        this.content = content;
        this.label = label;
        this.member = member;
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
}
