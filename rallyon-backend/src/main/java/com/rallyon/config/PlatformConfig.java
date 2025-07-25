package com.rallyon.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;

import java.nio.file.AccessDeniedException;
import java.util.Map;

@Data
@ConfigurationProperties(prefix = "platform")
public class PlatformConfig {

    private Map<String, String> codes;
    private String active;

    public String platformCode(String platformNm) {
        if (platformNm.equals(active)) {
            return codes.get(platformNm);
        } else {
            return platformNm;
        }
    }

    public void platformValidate(String reqValue) throws AccessDeniedException {

        if (!reqValue.equals(active)) {
            throw new AccessDeniedException("wrong platform access!");
        }
    }
}
