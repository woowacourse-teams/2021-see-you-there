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
public class CryptoDoubleConverter implements AttributeConverter<Double, String> {

    private static final String ALGORITHM = "AES/ECB/PKCS5Padding";
    private final Key key;

    public CryptoDoubleConverter(SecretKey secretKey) {
        this.key = new SecretKeySpec(secretKey.getCryptoSecretKey(), "AES");
    }

    @Override
    public String convertToDatabaseColumn(Double attribute) {
        String stringAttribute = String.valueOf(attribute);
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, key);
            return new String(Base64.getEncoder().encode(cipher.doFinal(stringAttribute.getBytes())));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Double convertToEntityAttribute(String dbData) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, key);
            String data = new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
            return Double.parseDouble(data);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
