package projectmain.mapper;

import org.apache.ibatis.annotations.Mapper;
import projectmain.model.User;

@Mapper
public interface UserMapper {
    // 회원 등록
    int insert(User user);
    // 사용자 조회
    User findByEmail(String email);
    // 닉네임으로 조회
    User findByNickname(String nickname);
    // ID로 조회
    User findById(Long userId);
    // 이메일이 존재하는지 확인
    boolean existsByEmail(String email);
    // 닉네임이 존재하는지 확인
    boolean existsByNickname(String nickname);
    // 사용자 정보 수정
    int update(User user);
    // 계정 삭제
    int delete(Long userId);
}
