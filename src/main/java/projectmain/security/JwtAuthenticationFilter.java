package projectmain.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// JWT 인증 필터 - 모든 HTTP 요청에 토큰 확인, 인증처리
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired private JwtTokenProvider tokenProvider;
    @Autowired private CustomUserDetailsService userDetailsService;

    // 필터 로직 구현 - 각 요청마다 한 번씩 실행
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // 요청에서 토큰 추출
            String jwt = getJwtFromRequest(request);

            // Jwt 토큰이 존재하고 유효하면
            if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
                // 토큰에서 사용자 이메일 추출
                String email = tokenProvider.getEmailFromToken(jwt);
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                // 인증 객체 생성
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // 현재 요청 정보 설정
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // 보안 컨텍스트에 인증 객체 설정
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("사용자 인증을 설정할 수 없습니다: {}", e.getMessage());
        }

        // 다음 필터로 요청 전달
        filterChain.doFilter(request, response);
    }

    // 요청 헤더에서 토큰 추출
    private String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7); // 접두사 제거
        }
        return null;
    }

    // 인증 없이 통과할 요청 필터 제외 처리
    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.startsWith("/auth") || path.startsWith("/cheerup")
                || path.startsWith("/swagger-ui") || path.startsWith("/v3/api-docs");
    }
}
