package projectmain.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import projectmain.security.JwtAuthenticationEntryPoint;
import projectmain.security.JwtAuthenticationFilter;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
/* Spring Security 설정 클래스 */
public class SecurityConfig {
    @Autowired private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    /* JWT 인증 필터를 빈으로 등록 - 모든 요청 JWT 토큰 확인 */
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }
    /* 비밀번호 인코더 빈으로 등록 - 비밀번호 암호화 */
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    /* 인증 관리자 - 사용자 인증 처리 */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }
    // 보안 필터 체인 설정
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Spring Security 6.1 이상에서는 cors() 대신 새로운 방식 사용
        http
                // CORS 설정
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // CSRF 보호 비활성화 (REST API에서는 일반적으로 비활성화)
                .csrf(csrf -> csrf.disable())
                // 인증 실패시 처리할 핸들러 설정
                .exceptionHandling(exceptionHandling ->
                        exceptionHandling.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                // 세션 정책을 STATELESS로 설정 (JWT 사용으로 세션 불필요)
                .sessionManagement(sessionManagement ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // URL별 접근 권한 설정
                .authorizeHttpRequests(authorize ->
                        authorize
                                // 인증 관련 API는 모든 사용자 접근 가능
                                .requestMatchers("/auth/**").permitAll()
                                // 응원(명언) API는 모든 사용자 접근 가능
                                .requestMatchers("/cheerup/**").permitAll()
                                // Swagger UI 관련 경로 접근 허용
                                .requestMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                                // 그 외 모든 요청은 인증 필요
                                .anyRequest().authenticated()
                );

        // JWT 필터를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
    /* CORS 설정 - 프론트 에서 호출 하능하도록 Cross-Origin 설정 */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173")); // 프론트엔드 주소
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}
