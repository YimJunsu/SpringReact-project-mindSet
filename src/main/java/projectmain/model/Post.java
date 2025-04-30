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
// 오운완 게시판
public class Post {
    private Long postId;
    private Long userId;              // 작성자 ID
    private String title;             // 게시글 제목
    private String content;           // 게시글 본문 내용
    private String imageUrl;          // 첨부 이미지 URL
    private Integer viewCount;        // 조회수
    private Integer likeCount;        // 좋아요 수
    private LocalDateTime createdAt;  // 작성일시
    private LocalDateTime updatedAt;  // 수정일시

    // 조인 용도의 필드 (선택적)
    private String userNickname;
    private String userProfileImage;
}