package org.ru.bot.service;

import org.ru.bot.repository.user.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HexFormat;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TelegramAuthService {

    private static final String BOT_TOKEN = "YOUR_BOT_TOKEN";
    private static final String SECRET_KEY = "WebAppData";

    public boolean verifyTelegramData(String initData) {
        try {
            Map<String, String> params = parseInitData(initData);

            String receivedHash = params.get("hash");
            params.remove("hash");

            String dataCheckString = params.entrySet().stream()
                    .sorted(Map.Entry.comparingByKey())
                    .map(entry -> entry.getKey() + "=" + entry.getValue())
                    .collect(Collectors.joining("\n"));

            String secretKey = HmacSHA256(SECRET_KEY, BOT_TOKEN);
            String calculatedHash = HmacSHA256(dataCheckString, secretKey);

            return calculatedHash.equals(receivedHash);
        } catch (Exception e) {
            return false;
        }
    }

    private String HmacSHA256(String data, String key) throws Exception {
        Mac hmac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        hmac.init(secretKeySpec);
        byte[] bytes = hmac.doFinal(data.getBytes(StandardCharsets.UTF_8));
        return HexFormat.of().formatHex(bytes);
    }

    private Map<String, String> parseInitData(String initData) {
        return Arrays.stream(initData.split("&"))
                .map(param -> param.split("="))
                .collect(Collectors.toMap(
                        arr -> arr[0],
                        arr -> arr.length > 1 ? URLDecoder.decode(arr[1], StandardCharsets.UTF_8) : ""
                ));
    }

    public String getId(String initData) {
        Map<String, String> params = parseInitData(initData);
        return params.get("id");
    }
}
