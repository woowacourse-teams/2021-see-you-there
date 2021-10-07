package seeuthere.goodday.notice.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seeuthere.goodday.notice.dao.NoticeRepository;
import seeuthere.goodday.notice.domain.Notice;

@Service
public class NoticeService {

    private final NoticeRepository noticeRepository;

    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    public Notice save(String title, String content) {
        Notice notice = new Notice(title, content);
        return noticeRepository.save(notice);
    }

    @Transactional
    public Notice edit(Long id, String title, String content) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow();
        notice.changeNotice(title, content);
        return notice;
    }

    @Transactional
    public Notice inactive(Long id) {
        Notice notice = noticeRepository.findById(id)
            .orElseThrow();
        notice.changeInactive();
        return notice;
    }

    public List<Notice> findAll() {
        return noticeRepository.findAllByActive(true);
    }
}
