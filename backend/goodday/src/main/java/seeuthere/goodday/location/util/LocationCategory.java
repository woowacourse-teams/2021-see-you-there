package seeuthere.goodday.location.util;

import java.util.HashMap;
import java.util.Map;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.exception.LocationExceptionSet;

public enum LocationCategory {

    MT1("MT1", "대형마트"),
    CS2("CS2", "편의점"),
    PS3("PS3", "어린이집,유치원"),
    SC4("SC4", "학교"),
    AC5("AC5", "학원"),
    PK6("PK5", "주차장"),
    OL7("OL7", "주유소,충전소"),
    SW8("SW8", "지하철역"),
    BK9("BK9", "은행"),
    CT1("CT1", "문화시설"),
    AG2("AG2", "중개업소"),
    PO3("PO3", "공공기관"),
    AT4("AT4", "관광명소"),
    AD5("AD5", "숙박"),
    FD6("FD6", "음식점"),
    CE7("CE7", "카페"),
    HP8("HP8", "병원"),
    PM9("PM9", "약국");

    private static final Map<String, LocationCategory> categoryMap = new HashMap<>();

    static {
        LocationCategory[] values = LocationCategory.values();
        for (LocationCategory value : values) {
            categoryMap.put(value.getDescription(), value);
        }
    }

    private final String code;
    private final String description;

    LocationCategory(String code, String description) {
        this.code = code;
        this.description = description;
    }

    public static String translatedCode(String description) {
        if (!categoryMap.containsKey(description)) {
            throw new GoodDayException(LocationExceptionSet.NOT_FOUND_CATEGORY);
        }
        return categoryMap.get(description).getCode();
    }

    public String getCode() {
        return code;
    }

    public String getDescription() {
        return description;
    }
}
