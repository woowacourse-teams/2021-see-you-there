package seeuthere.goodday.config.converter;

import java.security.Key;
import java.util.Base64;
import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.springframework.context.annotation.DependsOn;
import seeuthere.goodday.secret.SecretKey;

@Converter
@DependsOn("SecretKey")
public class CryptoStringConverter implements AttributeConverter<String, String> {

    private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
    private final Key key;

    public CryptoStringConverter(SecretKey secretKey) {
        this.key = new SecretKeySpec(secretKey.getCryptoSecretKey(), "AES");
    }

    @Override
    public String convertToDatabaseColumn(String attribute) {

        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            return new String(Base64.getEncoder().encode(cipher.doFinal(attribute.getBytes())));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            return new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
