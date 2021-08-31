package seeuthere.goodday.auth;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import seeuthere.goodday.auth.controller.EnableAuthArgumentResolver;
import seeuthere.goodday.auth.infrastructure.MemberInterceptor;
import seeuthere.goodday.auth.service.AuthService;

@Configuration
public class AuthenticationPrincipalConfig implements WebMvcConfigurer {

    private final AuthService authService;

    public AuthenticationPrincipalConfig(AuthService authService) {
        this.authService = authService;
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
        registry.addInterceptor(new MemberInterceptor(authService))
            .excludePathPatterns("/**")
            .addPathPatterns("/api/members/**");
    }
}
