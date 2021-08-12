package seeuthere.goodday.location.config;

import org.springframework.web.reactive.function.client.WebClient;
import seeuthere.goodday.location.domain.requester.CoordinateRequester;
import seeuthere.goodday.location.domain.requester.LocationRequester;
import seeuthere.goodday.location.domain.requester.SearchRequester;
import seeuthere.goodday.location.domain.requester.UtilityRequester;

public class Requesters {

    private CoordinateRequester coordinateRequester;
    private LocationRequester locationRequester;
    private SearchRequester searchRequester;
    private UtilityRequester utilityRequester;

    public Requesters(WebClient webClient) {
        this.coordinateRequester = new CoordinateRequester(webClient);
        this.locationRequester = new LocationRequester(webClient);
        this.searchRequester = new SearchRequester(webClient);
        this.utilityRequester = new UtilityRequester(webClient);
    }

    public CoordinateRequester coordinate() {
        return coordinateRequester;
    }

    public LocationRequester location() {
        return locationRequester;
    }

    public SearchRequester search() {
        return searchRequester;
    }

    public UtilityRequester utility() {
        return utilityRequester;
    }
}
