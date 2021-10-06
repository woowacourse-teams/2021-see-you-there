package seeuthere.goodday.config.converter;

import java.util.Base64;
import java.util.Objects;
import javax.crypto.Cipher;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.springframework.context.annotation.DependsOn;
import seeuthere.goodday.secret.SecretKey;

@Converter
@DependsOn("SecretKey")
public class CryptoStringConverter extends AbstractCryptoConverter implements
    AttributeConverter<String, String> {

    public CryptoStringConverter(SecretKey secretKey) {
        super(secretKey.getCryptoSecretKey());
    }

    @Override
    public String convertToDatabaseColumn(String attribute) {
        if (Objects.isNull(attribute)) {
            return null;
        }
        try {
            Cipher cipher = initCipher(Cipher.ENCRYPT_MODE);
            return Base64.getEncoder().encodeToString(cipher.doFinal(attribute.getBytes()));
        } catch (Exception e) {
            throw new ConverterException(e);
        }
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        if (Objects.isNull(dbData)) {
            return null;
        }
        try {
            Cipher cipher = initCipher(Cipher.DECRYPT_MODE);
            return new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
        } catch (Exception e) {
            throw new ConverterException(e);
        }
    }
}
