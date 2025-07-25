package com.rallyon.service;

import com.rallyon.dto.ScheduleRequest;
import com.rallyon.dto.ScheduleResponse;
import com.rallyon.entity.Platform;
import com.rallyon.entity.Schedule;

import java.util.List;

public interface SchelduleService {
    ScheduleResponse submitSchedule(ScheduleRequest request, Platform platform);

    List<Schedule> getScheduleList(Platform platform);
}
