package projectmain.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import projectmain.dto.response.auth.JwtResponse;
import projectmain.dto.request.auth.LoginRequest;
import projectmain.dto.request.auth.SignupRequest;
import projectmain.mapper.UserMapper;
import projectmain.model.User;
import projectmain.security.JwtTokenProvider;
import projectmain.security.UserDetailsImpl;

@Service
public class AuthService {
    @Autowired private UserMapper userMapper;
    @Autowired private PasswordEncoder passwordEncoder;
    @Autowired private AuthenticationManager authenticationManager;
    @Autowired private JwtTokenProvider jwtTokenProvider;

    // 이메일 존재 여부 확인
    public boolean existsByEmail(String email) {
        return userMapper.existsByEmail(email);
    }
    // 닉네임 존재 여부 확인
    public boolean existsByNickname(String nickname) {
        return userMapper.existsByNickname(nickname);
    }
    // 회원가입
    public void registerUser(SignupRequest signupRequest) {
        // 새 사용자 객체 생성
        User user = new User();
        user.setEmail(signupRequest.getEmail());
        // 비밀번호 암호화
        user.setPassword(passwordEncoder.encode(signupRequest.getPassword()));
        user.setNickname(signupRequest.getNickname());
        user.setGender(signupRequest.getGender());
        user.setPhone(signupRequest.getPhone());
        user.setAddress(signupRequest.getAddress());
        user.setAddressDetail(signupRequest.getAddressDetail());
        user.setPostCode(signupRequest.getPostCode());
        user.setProfileImage(signupRequest.getProfileImage());
        // 기본 역할 설정
        user.setRole("ROLE_USER");

        // 사용자 저장
        userMapper.insert(user);
    }
    // 로그인 + 토큰 발금
    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        // 인증 처리
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        // 인증 정보 저장
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // JWT 토큰 생성
        String accessToken = jwtTokenProvider.generateToken(authentication);
        String refreshToken = jwtTokenProvider.generateRefreshToken(loginRequest.getEmail());

        // 사용자 정보 가져오기
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        // JWT 응답 반환
        return new JwtResponse(
                accessToken,
                refreshToken,
                userDetails.getId(),
                userDetails.getUsername(),
                userDetails.getNickname()
        );
    }
    // 이메일 토큰 생성
    public String generateTokenFromEmail(String email){
        return jwtTokenProvider.generateTokenFromEmail(email);
    }
}
