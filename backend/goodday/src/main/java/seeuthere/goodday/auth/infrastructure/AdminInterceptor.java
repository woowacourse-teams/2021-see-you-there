package seeuthere.goodday.auth.infrastructure;

import javax.servlet.http.HttpServletRequest;
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
        String token = AuthorizationExtractor.extract(request);
        String memberId = authService.findMemberIdByToken(token);
        return memberService.isAdmin(memberId);
    }
}
