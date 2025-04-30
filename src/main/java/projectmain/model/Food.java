package projectmain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Food {
    private Long foodId;         // 음식 ID
    private String foodName;     // 음식 이름
    private Integer calories;    // 칼로리 (kcal)
    private Float protein;       // 단백질 (g)
    private Float carbs;         // 탄수화물 (g)
    private Float fat;           // 지방 (g)
    private String category;     // 음식 카테고리
}