package seeuthere.goodday.config.converter;

import java.util.Base64;
import javax.crypto.Cipher;
import javax.persistence.AttributeConverter;
import javax.persistence.Converter;
import org.springframework.context.annotation.DependsOn;
import seeuthere.goodday.secret.SecretKey;

@Converter
@DependsOn("SecretKey")
public class CryptoDoubleConverter extends AbstractCryptoConverter implements
    AttributeConverter<Double, String> {

    public CryptoDoubleConverter(SecretKey secretKey) {
        super(secretKey.getCryptoSecretKey());
    }

    @Override
    public String convertToDatabaseColumn(Double attribute) {
        String stringAttribute = String.valueOf(attribute);
        try {
            Cipher cipher = initCipher(Cipher.ENCRYPT_MODE);
            return Base64.getEncoder().encodeToString(cipher.doFinal(stringAttribute.getBytes()));
        } catch (Exception e) {
            throw new ConverterException();
        }
    }

    @Override
    public Double convertToEntityAttribute(String dbData) {
        try {
            Cipher cipher = initCipher(Cipher.DECRYPT_MODE);
            String data = new String(cipher.doFinal(Base64.getDecoder().decode(dbData)));
            return Double.parseDouble(data);
        } catch (Exception e) {
            throw new ConverterException();
        }
    }
}
