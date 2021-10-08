package seeuthere.goodday.auth;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import seeuthere.goodday.auth.controller.EnableAuthArgumentResolver;
import seeuthere.goodday.auth.infrastructure.AdminInterceptor;
import seeuthere.goodday.auth.infrastructure.JwtTokenProvider;
import seeuthere.goodday.auth.infrastructure.MemberInterceptor;
import seeuthere.goodday.auth.service.AuthService;
import seeuthere.goodday.member.service.MemberService;

@Configuration
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final AuthService authService;
    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthenticationPrincipalConfig(AuthService authService,
        MemberService memberService, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public void addArgumentResolvers(List argumentResolvers) {
        argumentResolvers.add(createEnableAuthArgumentResolver());
    }

    @Bean
    public EnableAuthArgumentResolver createEnableAuthArgumentResolver() {
        return new EnableAuthArgumentResolver(authService);
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new MemberInterceptor(jwtTokenProvider))
            .addPathPatterns("/api/members/**");
        registry.addInterceptor(new AdminInterceptor(authService, memberService))
            .addPathPatterns("/api/boards/*/comments/**");
    }
}
