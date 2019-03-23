package solutions.ethio.speedcontrol.application.utils;

import java.io.IOException;
import java.io.InputStream;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.security.InvalidKeyException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.PrivateKey;
import java.security.Signature;
import java.security.SignatureException;
import java.security.UnrecoverableKeyException;
import java.security.cert.CertificateException;
import java.time.Clock;
import java.util.Base64;

public class GcsUrlSigner
{
    private static final String PUBLIC_URL_SERVICE_ACCOUNT_EMAIL                = "cloudstorage-966@innoplexia-ivi.iam.gserviceaccount.com";
    private static final String PUBLIC_URL_SERVICE_ACCOUNT_PKCS12_FILE_PATH     = "Innoplexia-IVI-3a102e11210b.p12"; // located in the same folder as GcsUrlSigner.java
    private static final String PUBLIC_URL_SERVICE_ACCOUNT_PKCS12_FILE_PASSWORD = "notasecret";

    public static String generateSignedUrl(String bucketName, String objectName, long expirationDateInSeconds)
            throws KeyStoreException, CertificateException, NoSuchAlgorithmException, UnrecoverableKeyException, InvalidKeyException, SignatureException, IOException
    {
        PrivateKey key = loadKeyFromPkcs12(PUBLIC_URL_SERVICE_ACCOUNT_PKCS12_FILE_PATH, PUBLIC_URL_SERVICE_ACCOUNT_PKCS12_FILE_PASSWORD.toCharArray());

        return getSigningURL(key, "GET", expirationDateInSeconds, bucketName, objectName);
    }

    private static String getSigningURL(PrivateKey key, String verb, long expirationSeconds, String bucketName, String objectName)
            throws NoSuchAlgorithmException, InvalidKeyException, SignatureException, IOException
    {
        long expirationMillis = Clock.systemDefaultZone().millis() / 1000L + expirationSeconds;

        String url_signature = signString(key, getSignInput(expirationMillis + "", "/" + bucketName + "/" + objectName));

        return "https://storage.googleapis.com/" + bucketName + "/" + objectName +
                "?GoogleAccessId=" + PUBLIC_URL_SERVICE_ACCOUNT_EMAIL +
                "&Expires=" + expirationMillis +
                "&Signature=" + URLEncoder.encode(url_signature, "UTF-8");
    }

    private static PrivateKey loadKeyFromPkcs12(String filename, char[] password) throws KeyStoreException, CertificateException, NoSuchAlgorithmException, UnrecoverableKeyException, IOException
    {
        InputStream is = GcsUrlSigner.class.getResourceAsStream(PUBLIC_URL_SERVICE_ACCOUNT_PKCS12_FILE_PATH);
        KeyStore ks = KeyStore.getInstance("PKCS12");
        ks.load(is, password);

        return (PrivateKey) ks.getKey("privatekey", password);
    }

    private static String signString(PrivateKey key, String stringToSign) throws IOException, NoSuchAlgorithmException, InvalidKeyException, SignatureException
    {
        if (key == null)
        {
            throw new IOException("Private Key not initalized");
        }

        Signature signer = Signature.getInstance("SHA256withRSA");
        signer.initSign(key);
        signer.update(stringToSign.getBytes(StandardCharsets.UTF_8));

        byte[] rawSignature = signer.sign();

        return Base64.getEncoder().encodeToString(rawSignature);
    }

    private static String getSignInput(String expiryTime, String objectPath)
    {
        return "GET" + "\n"
                + "" + "\n"
                + "" + "\n"
                + expiryTime + "\n"
                + objectPath;
    }
}