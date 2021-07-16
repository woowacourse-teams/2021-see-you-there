package seeuthere.goodday.location.dto.api.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public class APILocationDocument {

    private String regionType;
    private String code;
    private String addressName;
    @JsonProperty("region_1depth_name")
    private String region1depthName;
    @JsonProperty("region_2depth_name")
    private String region2depthName;
    @JsonProperty("region_3depth_name")
    private String region3depthName;
    @JsonProperty("region_4depth_name")
    private String region4depthName;
    private double x;
    private double y;

    public APILocationDocument() {
    }

    public String getRegionType() {
        return regionType;
    }

    public String getCode() {
        return code;
    }

    public String getAddressName() {
        return addressName;
    }

    public String getRegion1depthName() {
        return region1depthName;
    }

    public String getRegion2depthName() {
        return region2depthName;
    }

    public String getRegion3depthName() {
        return region3depthName;
    }

    public String getRegion4depthName() {
        return region4depthName;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }

    @Override
    public String toString() {
        return "Document{" +
            "regionType='" + regionType + '\'' +
            ", code='" + code + '\'' +
            ", addressName='" + addressName + '\'' +
            ", region1depthName='" + region1depthName + '\'' +
            ", region2depthName='" + region2depthName + '\'' +
            ", region3depthName='" + region3depthName + '\'' +
            ", region4depthName='" + region4depthName + '\'' +
            ", x=" + x +
            ", y=" + y +
            '}';
    }
}
