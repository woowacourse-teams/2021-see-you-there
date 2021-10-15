package seeuthere.goodday.path.dto.response;

import seeuthere.goodday.path.domain.Route;
import seeuthere.goodday.path.dto.api.response.APIPathListResponse;

public class RouteResponse {

    private double startX;
    private double startY;
    private String startName;
    private String routeName;
    private double endX;
    private double endY;
    private String endName;

    public RouteResponse() {
    }

    public RouteResponse(double startX, double startY, String startName, String routeName,
        double endX, double endY, String endName) {
        this.startX = startX;
        this.startY = startY;
        this.startName = startName;
        this.routeName = routeName;
        this.endX = endX;
        this.endY = endY;
        this.endName = endName;
    }

    public RouteResponse(Builder builder) {
        this.startX = builder.startX;
        this.startY = builder.startY;
        this.startName = builder.startName;
        this.routeName = builder.routeName;
        this.endX = builder.endX;
        this.endY = builder.endY;
        this.endName = builder.endName;
    }

    public static RouteResponse valueOf(APIPathListResponse apiPathListResponse) {
        double startX = apiPathListResponse.getStartX();
        double startY = apiPathListResponse.getStartY();
        String startName = apiPathListResponse.getStartName();
        String routeName = apiPathListResponse.getRouteName();
        double endX = apiPathListResponse.getEndX();
        double endY = apiPathListResponse.getEndY();
        String endName = apiPathListResponse.getEndName();
        return new RouteResponse(startX, startY, startName, routeName, endX, endY, endName);
    }

    public static RouteResponse valueOf(Route route) {
        return new Builder()
            .startX(route.getStartX())
            .startY(route.getStartY())
            .startName(route.getStartName())
            .routeName(route.getRouteName())
            .endX(route.getEndX())
            .endY(route.getEndY())
            .endName(route.getEndName())
            .build();
    }

    public Route toRoute() {
        return new Route.Builder()
            .startX(startX)
            .startY(startY)
            .startName(startName)
            .routeName(routeName)
            .endX(endX)
            .endY(endY)
            .endName(endName)
            .build();
    }

    public double getStartX() {
        return startX;
    }

    public double getStartY() {
        return startY;
    }

    public String getStartName() {
        return startName;
    }

    public String getRouteName() {
        return routeName;
    }

    public double getEndX() {
        return endX;
    }

    public double getEndY() {
        return endY;
    }

    public String getEndName() {
        return endName;
    }

    public static class Builder {

        private double startX = 0;
        private double startY = 0;
        private String startName = "";
        private String routeName = "";
        private double endX = 0;
        private double endY = 0;
        private String endName = "";

        public Builder startX(double startX) {
            this.startX = startX;
            return this;
        }

        public Builder startY(double startY) {
            this.startY = startY;
            return this;
        }

        public Builder startName(String startName) {
            this.startName = startName;
            return this;
        }

        public Builder routeName(String routeName) {
            this.routeName = routeName;
            return this;
        }

        public Builder endX(double endX) {
            this.endX = endX;
            return this;
        }

        public Builder endY(double endY) {
            this.endY = endY;
            return this;
        }

        public Builder endName(String endName) {
            this.endName = endName;
            return this;
        }

        public RouteResponse build() {
            return new RouteResponse(this);
        }
    }
}
