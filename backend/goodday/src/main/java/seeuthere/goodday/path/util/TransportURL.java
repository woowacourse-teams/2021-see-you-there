package seeuthere.goodday.path.util;

import seeuthere.goodday.secret.SecretKey;

public enum TransportURL {

    BUS("/getPathInfoByBus"),
    SUBWAY("/getPathInfoBySubway"),
    BUS_AND_SUBWAY("/getPathInfoByBusNSub");

    private final String url;

    TransportURL(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }
}
