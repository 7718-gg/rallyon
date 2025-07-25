package com.rallyon.service.impl;

import com.rallyon.entity.Platform;
import com.rallyon.repository.PlatformRepository;
import com.rallyon.service.PlatformService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlatformServiceImpl implements PlatformService {

    private final PlatformRepository repository;

    public PlatformServiceImpl(PlatformRepository repository) {
        this.repository = repository;
    }

    @Override
    public List<Platform> getAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Platform> getByName(String name) {
        return repository.findByName(name);
    }

    @Override
    public Platform getByCode(String code) {
        return repository.findByCode(code);
    }

    @Override
    public Platform create(Platform platform) {
        return repository.save(platform);
    }

    @Override
    public Platform update(Long id, Platform updated) {
        return repository.findById(id)
                .map(p -> {
                    p.setCode(updated.getCode());
                    p.setName(updated.getName());
                    p.setDescription(updated.getDescription());
                    p.setType(updated.getType());
                    p.setActiveValue(updated.isActiveValue());
                    return repository.save(p);
                })
                .orElseThrow(() -> new RuntimeException("Platform not found with id: " + id));
    }

    /*@Override
    public void delete(Long id) {
        repository.deleteById(id);
    }*/
}
