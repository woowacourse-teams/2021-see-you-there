package seeuthere.goodday.auth.dto;

public class TokenResponse {

    private String accessToken;
    private String refreshToken;
    private String tokenType;
    private Long expiresIn;

    public String getAccessToken() {
        return accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public Long getExpiresIn() {
        return expiresIn;
    }
}
