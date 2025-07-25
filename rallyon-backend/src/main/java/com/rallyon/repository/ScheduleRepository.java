package com.rallyon.repository;

import com.rallyon.entity.Platform;
import com.rallyon.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    List<Schedule> findByPlatform(Platform platform);
}
