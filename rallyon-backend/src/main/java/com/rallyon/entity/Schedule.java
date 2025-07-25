package com.rallyon.entity;

import com.rallyon.dto.ScheduleRequest;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "schedules")
@Getter
@NoArgsConstructor
@Data
public class Schedule {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "platform_id")
    private Platform platform;

    private String title;
    private String date;
    private String place;
    private String tag;
    private String description;

    // 생성자에서 DTO를 바로 받음
    public Schedule(ScheduleRequest request) {
        this.title = request.getTitle();
        this.date = request.getDate();
        this.place = request.getPlace();
        this.tag = request.getTag();
        this.description = request.getDescription();

    }
}

