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
public class WorkoutRecord {
    private Long workoutId;
    private Long userId;
    private String workoutType;
    private Integer duration;  // 분 단위
    private Integer calories;
    private LocalDate workoutDate;
    private String memo;
    private LocalDateTime createdAt;
}