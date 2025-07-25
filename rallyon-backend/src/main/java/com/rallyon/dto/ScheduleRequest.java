package com.rallyon.dto;

import lombok.Data;

@Data
public class ScheduleRequest {
    private String platform;
    private String title;
    private String date;
    private String place;
    private String tag;
    private String description;


    public ScheduleRequest() {
    }
}

