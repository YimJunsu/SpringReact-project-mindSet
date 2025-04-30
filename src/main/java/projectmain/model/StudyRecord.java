package projectmain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudyRecord {
    private Long recordId;
    private Long userId;
    private String subject;
    private Integer duration;  // 분 단위
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String memo;
    private LocalDate createdDate;
}