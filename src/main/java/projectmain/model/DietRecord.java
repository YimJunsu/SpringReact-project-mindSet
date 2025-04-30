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
// 식단 기록
public class DietRecord {
    private Long dietId;
    private Long userId;
    private String mealType;  // 아침, 점심, 저녁, 간식
    private String foodItems;  // JSON 문자열
    private Integer calories; // 칼로리
    private LocalDate dietDate;
    private String imageUrl;
    private LocalDateTime createdAt;
}