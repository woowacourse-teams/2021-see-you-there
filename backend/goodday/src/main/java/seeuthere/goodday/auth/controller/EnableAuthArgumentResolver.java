package seeuthere.goodday.auth.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;
import seeuthere.goodday.auth.domain.EnableAuth;
import seeuthere.goodday.auth.infrastructure.AuthorizationExtractor;
import seeuthere.goodday.auth.service.AuthService;

public class EnableAuthArgumentResolver implements HandlerMethodArgumentResolver {

    private final AuthService authService;

    public EnableAuthArgumentResolver(AuthService authService) {
        this.authService = authService;
    }


    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(EnableAuth.class);
    }

    @Override
    public String resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
        NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = webRequest.getNativeRequest(HttpServletRequest.class);
        String token = AuthorizationExtractor.extract(request);
        return authService.findMemberIdByToken(token);
    }
}
