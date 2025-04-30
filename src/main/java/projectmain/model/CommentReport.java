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
public class CommentReport {
    private Long reportId;
    private Long commentId;
    private Long userId; // 유저명
    private String reason; // 이유
    private LocalDateTime createdAt;
}