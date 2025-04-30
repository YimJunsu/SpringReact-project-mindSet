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
public class QuestionReply {
    private Long replyId;
    private Long questionId; // 질문 fk
    private Long userId;     // 답변자 id
    private String content;
    private boolean isSelected; // 채텍 여부 t / f
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    // 조인 용도의 필드 (선택적)
    private String userNickname;
}