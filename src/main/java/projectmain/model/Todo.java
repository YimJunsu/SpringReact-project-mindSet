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
public class Todo {
    private Long todoId;
    private Long userId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime completedAt;
    private boolean isCompleted;        // 완료 여부
}