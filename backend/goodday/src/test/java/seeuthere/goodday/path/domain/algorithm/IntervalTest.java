package seeuthere.goodday.path.domain.algorithm;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import seeuthere.goodday.location.domain.location.Point;

class IntervalTest {

    @DisplayName("위도 경도를 활용하여 거리를 계산하는 로직")
    @Test
    void value() {
        //when
        Point startPoint = new Point(126.89600431494024, 37.47984260687255);
        Point endPoint = new Point(126.90159270290947, 37.48524131417615);
        int value = 776;

        //given
        Interval interval = Interval.calculate(startPoint, endPoint);

        //then
        assertThat(interval.distance()).isEqualTo(value);

    }

    @DisplayName("걷는 시간을 계산하는 로직")
    @Test
    void walkTime() {
        //when
        Point startPoint = new Point(126.89600431494024, 37.47984260687255);
        Point endPoint = new Point(126.90159270290947, 37.48524131417615);
        int value = 11;

        //given
        Interval interval = Interval.calculate(startPoint, endPoint);

        //then
        assertThat(interval.walkTime()).isEqualTo(value);
    }
}