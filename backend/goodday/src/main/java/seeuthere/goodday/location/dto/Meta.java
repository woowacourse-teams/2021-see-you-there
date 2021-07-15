package seeuthere.goodday.location.dto;

public class Meta {

    int totalCount;

    public Meta() {
    }

    public Meta(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getTotalCount() {
        return totalCount;
    }

    @Override
    public String toString() {
        return "Meta{" +
                "totalCount=" + totalCount +
                '}';
    }
}
