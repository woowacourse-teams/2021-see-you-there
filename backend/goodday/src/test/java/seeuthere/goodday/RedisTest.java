//package seeuthere.goodday;
//
//import static org.assertj.core.api.Assertions.assertThat;
//
//import java.time.LocalDateTime;
//import org.junit.jupiter.api.DisplayName;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.DirtiesContext;
//import seeuthere.goodday.redis.Point;
//import seeuthere.goodday.redis.PointRedisRepository;
//
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
//@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
//public class RedisTest {
//
//    @Autowired
//    private PointRedisRepository pointRedisRepository;
//
//    @DisplayName("redis 테스트")
//    @Test
//    void redisTest() {
//        //given
//        String id = "Youngee";
//        LocalDateTime refreshTime = LocalDateTime.of(2021, 8, 5, 0, 0);
//        Point point = new Point(id, 1000L, refreshTime);
//
//        //when
//        pointRedisRepository.save(point);
//
//        // then
//        Point savedPoint = pointRedisRepository.findById(id).get();
//        assertThat(savedPoint.getAmount()).isEqualTo(1000L);
//        assertThat(savedPoint.getRefreshTime()).isEqualTo(refreshTime);
//
//    }
//
//}
