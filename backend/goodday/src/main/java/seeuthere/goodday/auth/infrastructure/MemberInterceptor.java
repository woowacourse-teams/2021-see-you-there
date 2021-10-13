package seeuthere.goodday.auth.infrastructure;

import javax.servlet.http.HttpServletRequest;

public class MemberInterceptor extends AbstractInterceptor {

    private final JwtTokenProvider jwtTokenProvider;

    public MemberInterceptor(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public boolean process(HttpServletRequest request) {
        String token = AuthorizationExtractor.extract(request);
        return jwtTokenProvider.validateToken(token);
    }
}
