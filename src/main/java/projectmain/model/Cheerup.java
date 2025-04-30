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
public class Cheerup {
    private Long cheerupId;
    private String content; // 격언 내용
    private String author; // 작가
    private LocalDateTime createdAt;
}