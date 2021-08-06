package seeuthere.goodday.path.domain;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.LinkedList;
import java.util.List;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import seeuthere.goodday.location.domain.location.Point;

class PathTest {

    @DisplayName("앞 뒤로 걷는 시간 추가 유효성 확인")
    @Test
    void addWalkPath() {
        //when
        Point startPoint = new Point(126.89600431494024, 37.47984260687255);
        Point endPoint = new Point(127.10283123652131, 37.515332000671656);

        PointWithName startPointWithName = new PointWithName(startPoint, "");
        PointWithName endPointWithName = new PointWithName(endPoint, "");

        Path path = initialPath();

        //then
        path = path.addWalkRoute(startPointWithName, endPointWithName);

        //given
        assertThat(path.getRoutes().size()).isEqualTo(3);
    }

    @DisplayName("앞 뒤로 걷는 시간 추가 확인")
    @Test
    void addWalkTime() {
        //when
        Point startPoint = new Point(126.89600431494024, 37.47984260687255);
        Point endPoint = new Point(127.10283123652131, 37.515332000671656);

        PointWithName startPointWithName = new PointWithName(startPoint, "");
        PointWithName endPointWithName = new PointWithName(endPoint, "");

        Path path = initialPath();

        //then
        path = path.addWalkRoute(startPointWithName, endPointWithName);

        //given
        assertThat(path.getTime()).isEqualTo(45);
    }

    @DisplayName("앞 뒤로 걷는 거리 추가 확인")
    @Test
    void addWalkDistance() {
        Point startPoint = new Point(126.89600431494024, 37.47984260687255);
        Point endPoint = new Point(127.10283123652131, 37.515332000671656);

        PointWithName startPointWithName = new PointWithName(startPoint, "");
        PointWithName endPointWithName = new PointWithName(endPoint, "");

        Path path = initialPath();

        //then
        path = path.addWalkRoute(startPointWithName, endPointWithName);

        //햪두
        assertThat(path.getDistance()).isEqualTo(21100);
    }

    private Path initialPath() {
        Route route = new Route.Builder()
            .startX(126.90160828768775)
            .startY(37.4852046192067)
            .startName("구로디지털단지역")
            .routeName("2호선")
            .endX(127.10016253931232)
            .endY(37.51329145451131)
            .endName("잠실역")
            .build();
        int distance = 20000;
        int time = 30;
        List<Route> routes = new LinkedList<>();
        routes.add(route);
        return new Path(routes, distance, time, 0);
    }

}