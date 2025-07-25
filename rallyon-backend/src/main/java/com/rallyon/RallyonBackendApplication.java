package com.rallyon;

import com.rallyon.config.PlatformConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@ConfigurationPropertiesScan
@EnableConfigurationProperties(PlatformConfig.class)
public class RallyonBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(RallyonBackendApplication.class, args);
    }

}
