package projectmain.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
// 인증되지 않은 사용자 보호된 리소스 접근시 호출 - 401 응답 반환
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint{
    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException, ServletException {
        logger.error("인증되지 않은 접근 오류: {}", authException.getMessage());
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "인증되지 않은 접근입니다. 로그인이 필요합니다.");
    }
}
