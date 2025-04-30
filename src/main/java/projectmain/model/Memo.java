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
public class Memo {
    private Long memoId;
    private Long userId;              // 작성자 ID
    private String title;             // 메모 제목
    private String content;           // 메모 내용
    private String category;          // 메모 분류 (예: 업무, 개인, 아이디어 등)
    private LocalDateTime createdAt;  // 메모 생성 시간
    private LocalDateTime updatedAt;  // 메모 수정 시간
}