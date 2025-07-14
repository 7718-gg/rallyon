// src/main/java/com/rallyon/model/Platform.java
package com.rallyon.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Platform {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String code;  // rallyon, mustic 등

    private String name;  // 사용자용 플랫폼 이름

    @Column(length = 1000)
    private String description;

    private String type;  // 예: protest, musical 등

    private boolean activeValue;
}
