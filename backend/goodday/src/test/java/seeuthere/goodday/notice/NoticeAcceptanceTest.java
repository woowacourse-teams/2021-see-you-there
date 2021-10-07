package seeuthere.goodday.notice;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.notice.dto.NoticeRequest;

public class NoticeAcceptanceTest extends AcceptanceTest {
    
    @DisplayName("공지를 작성한다.")
    @Test
    void save() {
        String title = "여기서 만나 공지";
        String content = "여기서 만나 공지 내용";

        NoticeRequest noticeRequest = new NoticeRequest(title, content);
    }

    @DisplayName("모든 공지를 가져온다.")
    @Test
    void findAll() {
        String identifier = "notice/notice-read";  
    }

    @DisplayName("공지를 비활성화한다.")
    @Test
    void inactive() {
        String identifier = "notice/notice-inactive";
    }

    @DisplayName("관리자가 아닐 시 공지 비활성을 못한다.")
    @Test
    void inactiveNotAdminFail() {
        String identifier = "notice/notice-inactive-exception";
    }

    @DisplayName("공지를 수정한다.")
    @Test
    void update() {
        String identifier = "notice/notice-update";
    }

    @DisplayName("관리자가 아닐 시 공지 수정을 못한다.")
    @Test
    void updateNotAdminFail() {
        String identifier = "notice/notice-update-exception";
    }

}
