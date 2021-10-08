package seeuthere.goodday.config.converter;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

public abstract class AbstractCryptoConverter {

    private static final String ALGORITHM = "AES/GCM/NoPadding";
    private static final int TAG_LENGTH = 16 * 8;
    private static final String AES = "AES";

    private final SecretKeySpec secretKeySpec;
    private final byte[] secretKey;

    protected AbstractCryptoConverter(byte[] secretKey) {
        this.secretKey = secretKey;
        this.secretKeySpec = initSpec();
    }

    private SecretKeySpec initSpec() {
        try {
            return new SecretKeySpec(secretKey, AES);
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
