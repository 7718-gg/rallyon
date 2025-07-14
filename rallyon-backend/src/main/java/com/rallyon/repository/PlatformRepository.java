// src/main/java/com/rallyon/repository/PlatformRepository.java
package com.rallyon.repository;

import com.rallyon.entity.Platform;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlatformRepository extends JpaRepository<Platform, Long> {
    Optional<Platform> findByCode(String code);
}
