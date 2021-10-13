package seeuthere.goodday.notice;

import static org.assertj.core.api.Assertions.assertThat;

import io.restassured.response.ExtractableResponse;
import io.restassured.response.Response;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import seeuthere.goodday.AcceptanceTest;
import seeuthere.goodday.DataLoader;
import seeuthere.goodday.TestMethod;
import seeuthere.goodday.notice.domain.Notice;
import seeuthere.goodday.notice.dto.NoticeRequest;
import seeuthere.goodday.notice.dto.NoticeResponse;
import seeuthere.goodday.notice.service.NoticeService;

class NoticeAcceptanceTest extends AcceptanceTest {

    @Autowired
    private NoticeService noticeService;

    @DisplayName("공지를 작성한다.")
    @Test
    void save() {
        //given
        String identifier = "notice/create";
        String title = "여기서 만나 공지";
        String content = "여기서 만나 공지 내용";

        NoticeRequest noticeRequest = new NoticeRequest(title, content);
        NoticeResponse noticeResponse = makeResponse("/api/notices",
            TestMethod.POST,
            DataLoader.와이비토큰,
            noticeRequest,
            identifier
        ).as(NoticeResponse.class);

        //then
        assertThat(noticeResponse.getTitle()).isEqualTo(title);
        assertThat(noticeResponse.getContent()).isEqualTo(content);
    }

    @Test
    @DisplayName("관리자가 아닌 사람이 공지를 작성하면 에러가 발생한다.")
    void saveExceptionWithNotAdmin() {
        //given
        String identifier = "notice/notice-create-exception";
        String title = "여기서 만나 공지";
        String content = "여기서 만나 공지 내용";

        //when
        NoticeRequest noticeRequest = new NoticeRequest(title, content);
        ExtractableResponse<Response> response = makeResponse("/api/notices",
            TestMethod.POST,
            DataLoader.멍토토큰,
            noticeRequest,
            identifier
        );

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @DisplayName("모든 공지를 가져온다.")
    @Test
    void findAll() {
        String identifier = "notice/notice-read";
        createdNotice();

        //when
        ExtractableResponse<Response> response = makeResponse("/api/notices",
            TestMethod.GET,
            DataLoader.멍토토큰,
            identifier
        );
        List<NoticeResponse> noticeResponses = response.body().jsonPath()
            .getList(".", NoticeResponse.class);

        //then
        assertThat(noticeResponses).isNotEmpty();
    }

    @DisplayName("공지를 비활성화한다.")
    @Test
    void deActive() {
        //given
        String identifier = "notice/notice-deactive";
        Notice notice = createdNotice();
        Long id = notice.getId();

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/notices/%d/deactivation", id),
            TestMethod.PUT,
            DataLoader.와이비토큰,
            identifier
        );

        //then
        assertThat(response.statusCode()).isEqualTo(HttpStatus.NO_CONTENT.value());
    }

    @DisplayName("관리자가 아닐 시 공지 비활성을 못한다.")
    @Test
    void deActiveNotAdminFail() {
        //given
        String identifier = "notice/notice-deactive-exception";
        Notice notice = createdNotice();
        Long id = notice.getId();

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/notices/%d/deactivation", id),
            TestMethod.PUT,
            DataLoader.멍토토큰,
            identifier
        );

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    @DisplayName("공지를 수정한다.")
    @Test
    void update() {
        //given
        String identifier = "notice/notice-update";
        Notice notice = createdNotice();
        Long id = notice.getId();
        String fixedTitle = "수정된 공지";
        String fixedContent = "수정된 내용";
        NoticeRequest noticeRequest = new NoticeRequest(fixedTitle, fixedContent);

        //when
        NoticeResponse response = makeResponse(
            String.format("/api/notices/%d", id),
            TestMethod.PUT,
            DataLoader.와이비토큰,
            noticeRequest,
            identifier
        ).as(NoticeResponse.class);

        assertThat(response.getTitle()).isEqualTo(fixedTitle);
        assertThat(response.getContent()).isEqualTo(fixedContent);
    }

    @DisplayName("관리자가 아닐 시 공지 수정을 못한다.")
    @Test
    void updateNotAdminFail() {
        String identifier = "notice/notice-update-exception";
        Notice notice = createdNotice();
        Long id = notice.getId();
        String fixedTitle = "수정된 공지";
        String fixedContent = "수정된 내용";
        NoticeRequest noticeRequest = new NoticeRequest(fixedTitle, fixedContent);

        //when
        ExtractableResponse<Response> response = makeResponse(
            String.format("/api/notices/%d", id),
            TestMethod.PUT,
            DataLoader.멍토토큰,
            noticeRequest,
            identifier
        );

        assertThat(response.statusCode()).isEqualTo(HttpStatus.UNAUTHORIZED.value());
    }

    public Notice createdNotice() {
        String title = "여기서 만나 공지";
        String content = "여기서 만나 공지 내용";
        return noticeService.save(title, content);
    }
}
