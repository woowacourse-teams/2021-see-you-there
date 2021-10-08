package seeuthere.goodday.auth.infrastructure;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import org.springframework.http.HttpMethod;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.member.service.MemberService;

public class AdminInterceptor extends AbstractInterceptor {

    private final AuthService authService;
    private final MemberService memberService;

    public AdminInterceptor(AuthService authService, MemberService memberService) {
        this.authService = authService;
        this.memberService = memberService;
    }

    @Override
    public boolean process(HttpServletRequest request) {
        System.out.println(request.getRequestURI());
        if (request.getRequestURI().equals("/api/notices") &&
            HttpMethod.GET.matches(request.getMethod())) {
            return true;
        }
        String token = AuthorizationExtractor.extract(request);
        String memberId = authService.findMemberIdByToken(token);
        return memberService.isAdmin(memberId);
    }
}
