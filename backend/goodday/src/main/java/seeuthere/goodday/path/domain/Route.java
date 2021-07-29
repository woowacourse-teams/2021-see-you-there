package seeuthere.goodday.path.domain;

public class Route {

    private final double startX;
    private final double startY;
    private final String startName;
    private final String routeName;
    private final double endX;
    private final double endY;
    private final String endName;

    private Route(Builder builder) {
        this.startX = builder.startX;
        this.startY = builder.startY;
        this.startName = builder.startName;
        this.routeName = builder.routeName;
        this.endX = builder.endX;
        this.endY = builder.endY;
        this.endName = builder.endName;
    }

    public static class Builder {

        private double startX = 0;
        private double startY = 0;
        private String startName = "";
        private String routeName = "";
        private double endX = 0;
        private double endY = 0;
        private String endName = "";

        public Builder() {
        }

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

        public Route build() {
            return new Route(this);
        }
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
}
