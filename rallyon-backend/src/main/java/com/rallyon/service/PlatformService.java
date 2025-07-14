// src/main/java/com/rallyon/service/PlatformService.java
package com.rallyon.service;

import com.rallyon.entity.Platform;

import java.util.List;
import java.util.Optional;

public interface PlatformService {
    List<Platform> getAll();
    Optional<Platform> getByCode(String code);
    Platform create(Platform platform);
    Platform update(Long id, Platform platform);
    void delete(Long id);
}
