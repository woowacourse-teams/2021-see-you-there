package seeuthere.goodday.config.converter;

import java.security.Key;
import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public abstract class AbstractCryptoConverter {

    protected static final String ALGORITHM = "AES/GCM/NoPadding";
    protected static final int AES_KEY_SIZE = 256;
    protected static final int TAG_LENGTH = 16 * 8;
    protected static final String AES = "AES";

    protected final SecretKeySpec secretKeySpec;
    protected final byte[] secretKey;

    protected AbstractCryptoConverter(byte[] secretKey) {
        this.secretKey = secretKey;
        this.secretKeySpec = initSpec();
    }

    private SecretKeySpec initSpec() {
        try {
            KeyGenerator keyGenerator = KeyGenerator.getInstance(AES);
            keyGenerator.init(AES_KEY_SIZE);
            Key key = keyGenerator.generateKey();
            return new SecretKeySpec(key.getEncoded(), AES);
        } catch (Exception e) {
            throw new ConverterException(e);
        }
    }

    protected Cipher initCipher(int mode) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            GCMParameterSpec gcmParameterSpec = new GCMParameterSpec(TAG_LENGTH, secretKey);
            cipher.init(mode, secretKeySpec, gcmParameterSpec);
            return cipher;
        } catch (Exception e) {
            throw new ConverterException(e);
        }
    }
}
