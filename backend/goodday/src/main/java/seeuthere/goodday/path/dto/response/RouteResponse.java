package seeuthere.goodday.path.dto.response;

import seeuthere.goodday.path.dto.api.response.APIPathListResponse;

public class RouteResponse {

    private final double startX;
    private final double startY;
    private final String startName;
    private final String routeName;
    private final double endX;
    private final double endY;
    private final String endName;

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
}
