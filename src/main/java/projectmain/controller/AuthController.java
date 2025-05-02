package projectmain.controller;

import projectmain.dto.request.auth.LoginRequest;
import projectmain.dto.request.auth.SignupRequest;
import projectmain.dto.response.auth.JwtResponse;
import projectmain.dto.response.auth.MessageResponse;
import projectmain.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        // 이메일 중복 검사
        if (authService.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("이미 사용 중인 이메일입니다."));
        }

        // 닉네임 중복 검사
        if (authService.existsByNickname(signupRequest.getNickname())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("이미 사용 중인 닉네임입니다."));
        }

        // 회원 가입 처리
        authService.registerUser(signupRequest);

        return ResponseEntity.ok(new MessageResponse("회원가입이 완료되었습니다."));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        JwtResponse jwtResponse = authService.authenticateUser(loginRequest);
        return ResponseEntity.ok(jwtResponse);
    }
}