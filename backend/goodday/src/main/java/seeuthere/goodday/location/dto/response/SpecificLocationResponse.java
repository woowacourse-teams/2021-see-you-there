package seeuthere.goodday.location.dto.response;

import seeuthere.goodday.location.dto.api.response.APILocationDocument;

public class SpecificLocationResponse {

    private final String regionType;
    private final String code;
    private final String addressName;
    private final String region1DepthName;
    private final String region2DepthName;
    private final String region3DepthName;
    private final String region4DepthName;
    private final double x;
    private final double y;

    public SpecificLocationResponse(APILocationDocument apiLocationDocument) {
        this.regionType = apiLocationDocument.getRegionType();
        this.code = apiLocationDocument.getCode();
        this.addressName = apiLocationDocument.getAddressName();
        this.region1DepthName = apiLocationDocument.getRegion1depthName();
        this.region2DepthName = apiLocationDocument.getRegion2depthName();
        this.region3DepthName = apiLocationDocument.getRegion3depthName();
        this.region4DepthName = apiLocationDocument.getRegion4depthName();
        this.x = apiLocationDocument.getX();
        this.y = apiLocationDocument.getY();
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

    public String getRegion1DepthName() {
        return region1DepthName;
    }

    public String getRegion2DepthName() {
        return region2DepthName;
    }

    public String getRegion3DepthName() {
        return region3DepthName;
    }

    public String getRegion4DepthName() {
        return region4DepthName;
    }

    public double getX() {
        return x;
    }

    public double getY() {
        return y;
    }
}
