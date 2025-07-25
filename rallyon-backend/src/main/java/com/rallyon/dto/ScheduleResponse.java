package com.rallyon.dto;

import com.rallyon.entity.Schedule;


public record ScheduleResponse(
        Long id,
        String title,
        String date,
        String platform,
        String description,
        String place,
        String message
) {
    // 엔티티를 DTO로 변환하는 기본 메서드
    public static ScheduleResponse from(Schedule schedule) {
        return new ScheduleResponse(
                schedule.getId(),
                schedule.getTitle(),
                schedule.getDate(),
                schedule.getPlatform().getName(),
                schedule.getDescription(),
                schedule.getPlace(),
                "ok"
        );
    }

    // id와 message만 전달하는 정적 메서드
    public static ScheduleResponse ofMessage(Long id, String message) {
        return new ScheduleResponse(
                id,
                null,
                null,
                null,
                null,
                null,
                message
        );
    }
}
