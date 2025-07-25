package com.rallyon.service.impl;

import com.rallyon.dto.ScheduleRequest;
import com.rallyon.dto.ScheduleResponse;
import com.rallyon.entity.Platform;
import com.rallyon.entity.Schedule;
import com.rallyon.repository.PlatformRepository;
import com.rallyon.repository.ScheduleRepository;
import com.rallyon.service.SchelduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ScheduleServiceImpl implements SchelduleService {

    private final ScheduleRepository scheduleRepository;
    private final PlatformRepository platformRepository;

    @Override
    public ScheduleResponse submitSchedule(ScheduleRequest request, Platform platform) {

        Schedule schedule = new Schedule(request);
        schedule.setPlatform(platform);
        scheduleRepository.save(schedule);
        return ScheduleResponse.ofMessage(schedule.getId(), "일정이 등록되었습니다!");
    }

    @Override
    public List<Schedule> getScheduleList(Platform platform) {
        return scheduleRepository.findByPlatform(platform);
    }
}
