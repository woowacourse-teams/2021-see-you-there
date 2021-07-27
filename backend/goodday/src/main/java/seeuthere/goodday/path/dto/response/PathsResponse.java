package seeuthere.goodday.path.dto.response;

import java.util.List;
import java.util.stream.Collectors;
import seeuthere.goodday.path.dto.api.response.APIMsgBodyResponse;

public class PathsResponse {

    private final List<PathResponse> paths;

    public PathsResponse(List<PathResponse> paths) {
        this.paths = paths;
    }

    public List<PathResponse> getPaths() {
        return paths;
    }

    public static PathsResponse valueOf(APIMsgBodyResponse apiMsgBodyResponse) {
        return new PathsResponse(
            apiMsgBodyResponse.getItemListAPIResponses()
                .stream()
                .map(PathResponse::valueOf)
                .collect(Collectors.toList())
        );
    }
}
