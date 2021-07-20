package seeuthere.goodday.auth;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import seeuthere.goodday.auth.infrastructure.MemberInterceptor;
import seeuthere.goodday.auth.service.AuthService;

@Configuration
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final AuthService authService;

    public AuthenticationPrincipalConfig(AuthService authService) {
        this.authService = authService;
    }

//    @Override
//    public void addInterceptors(InterceptorRegistry registry) {
//        registry.addInterceptor(new MemberInterceptor(authService))
//            .excludePathPatterns("/docs")
//            .excludePathPatterns("/api/kakao/oauth")
//            .excludePathPatterns("/api/kakao/callback")
//            .excludePathPatterns("/api/naver/oauth")
//            .excludePathPatterns("/api/naver/callback")
//            .excludePathPatterns("/api/location/**");
//    }
}
