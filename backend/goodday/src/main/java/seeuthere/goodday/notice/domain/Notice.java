package seeuthere.goodday.notice.domain;

import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity
public class Notice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @CreationTimestamp
    private LocalDateTime createTime;
    @UpdateTimestamp
    private LocalDateTime updateTime;
    private String title;
    @Lob
    private String content;
    private Boolean active;

    public Notice() {
    }

    public Notice(String title, String content) {
        this.title = title;
        this.content = content;
        this.active = true;
    }

    public void changeNotice(String title, String content) {
        this.title = title;
        this.content = content;
    }

    public void changeActivation() {
        this.active = false;
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

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public Boolean getActive() {
        return active;
    }
}
