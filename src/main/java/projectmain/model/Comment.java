package projectmain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    private Long commentId;
    private Long postId; // 게시글아이디(fk)
    private Long userId; // 유저아이디(fk)
    private String content; // 내용
    private Integer reportCount; // 신고 기능
    private Boolean isHidden; // 숨기기 가능
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 조인 용도의 필드
    private String userNickname; // 유저닉네임
    private String userProfileImage; // 프로필사진
}