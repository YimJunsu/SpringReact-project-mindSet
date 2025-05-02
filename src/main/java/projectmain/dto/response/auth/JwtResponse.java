package projectmain.dto.response.auth;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private String accessToken;
    private String refreshToken;
    private String tokenType = "Bearer";
    private Long id;
    private String email;
    private String nickname;

    public JwtResponse(String accessToken, String refreshToken, Long id, String email, String nickname) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.email = email;
        this.nickname = nickname;
    }
}
