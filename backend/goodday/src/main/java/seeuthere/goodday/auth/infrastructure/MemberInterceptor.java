package seeuthere.goodday.auth.infrastructure;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.exception.GoodDayException;

public class MemberInterceptor implements HandlerInterceptor {

    private final AuthService authService;

    public MemberInterceptor(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) {
        try {
            if ("OPTIONS".equals(request.getMethod())) {
                return true;
            }
            String token = AuthorizationExtractor.extract(request);
            authService.validate(token);
            return true;
        } catch (GoodDayException goodDayException) {
            return false;
        }
    }
}
