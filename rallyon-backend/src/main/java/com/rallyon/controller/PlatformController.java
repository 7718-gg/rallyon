// src/main/java/com/rallyon/controller/PlatformController.java
package com.rallyon.controller;

import com.rallyon.entity.Platform;
import com.rallyon.service.PlatformService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/platforms")
@CrossOrigin(origins = "http://localhost:5173")
public class PlatformController {

    private final PlatformService service;

    public PlatformController(PlatformService service) {
        this.service = service;
    }

    @GetMapping
    public List<Platform> getAll() {
        return service.getAll();
    }

    @GetMapping("/{code}")
    public Platform getByCode(@PathVariable String code) {
        return service.getByCode(code)
                .orElseThrow(() -> new RuntimeException("Platform not found: " + code));
    }

    @PostMapping
    public Platform create(@RequestBody Platform platform) {
        return service.create(platform);
    }

    @PutMapping("/{id}")
    public Platform update(@PathVariable Long id, @RequestBody Platform platform) {
        return service.update(id, platform);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
