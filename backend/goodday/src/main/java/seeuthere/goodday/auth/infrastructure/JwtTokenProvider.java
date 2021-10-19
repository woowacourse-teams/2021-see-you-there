package seeuthere.goodday.auth.infrastructure;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Component;
import seeuthere.goodday.auth.exception.AuthExceptionSet;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.secret.SecretKey;

@Component
@DependsOn("SecretKey")
public class JwtTokenProvider {

    private final SecretKey secretKey;

    public JwtTokenProvider(SecretKey secretKey) {
        this.secretKey = secretKey;
    }

    public String createToken(String payload) {
        Claims claims = Jwts.claims().setSubject(payload);
        Date now = new Date();
        Date validity = new Date(now.getTime() + secretKey.getJwtValidityTime());

        return Jwts.builder()
            .setClaims(claims)
            .setIssuedAt(now)
            .setExpiration(validity)
            .signWith(SignatureAlgorithm.HS256, secretKey.getJwtSecretKey())
            .compact();
    }

    public String extractId(String token) {
        if (!validateToken(token)) {
            throw new GoodDayException(AuthExceptionSet.INVALID_TOKEN);
        }
        return Jwts.parser().setSigningKey(secretKey.getJwtSecretKey()).parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey.getJwtSecretKey())
                .parseClaimsJws(token);
            return !claims.getBody().getExpiration().before(new Date());
        } catch (JwtException | IllegalArgumentException exception) {
            throw new GoodDayException(AuthExceptionSet.INVALID_TOKEN);
        }
    }
}
