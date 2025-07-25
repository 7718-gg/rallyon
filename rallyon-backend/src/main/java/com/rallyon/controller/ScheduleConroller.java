package com.rallyon.controller;

import com.rallyon.config.PlatformConfig;
import com.rallyon.dto.ScheduleRequest;
import com.rallyon.dto.ScheduleResponse;
import com.rallyon.entity.Platform;
import com.rallyon.entity.Schedule;
import com.rallyon.service.PlatformService;
import com.rallyon.service.SchelduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@RequestMapping("/schedule")
@RequiredArgsConstructor
public class ScheduleConroller {

    private final SchelduleService schelduleService;
    private final PlatformService platformService;
    private final PlatformConfig platformConfig;

    @PostMapping("/submit")
    public ResponseEntity<ScheduleResponse> submitSchedule(@RequestBody ScheduleRequest request) throws AccessDeniedException {
        platformConfig.platformValidate(request.getPlatform());
        Platform platform = platformService.getByCode(platformConfig.platformCode(request.getPlatform()));
        ScheduleResponse response = schelduleService.submitSchedule(request, platform);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/") //default search list
    public List<ScheduleResponse> getScheduleList(@RequestParam(name = "platform") String platformNm) throws AccessDeniedException {

        platformConfig.platformValidate(platformNm);

        String platformCode = platformConfig.platformCode(platformNm);
        Platform platform = platformService.getByCode(platformCode);

        List<Schedule> schedules = schelduleService.getScheduleList(platform);

        return schedules.stream().map(ScheduleResponse::from).toList();
    }
}
