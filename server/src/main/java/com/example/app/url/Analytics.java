package com.example.app.url;

import java.time.LocalDateTime;

public class Analytics {
    private Long count;
    private LocalDateTime lastTimeAccessed;

    public Analytics(Long count, LocalDateTime lastTimeAccessed) {
        this.count = count;
        this.lastTimeAccessed = lastTimeAccessed;
    }

    public Long getCount() {
        return this.count;
    }

    public void setCount(Long count) {
        this.count = count;
    }

    public LocalDateTime getLocalDateTime() {
        return this.lastTimeAccessed;
    }

    public void setLastTimeAccessed(LocalDateTime lastTimeAccessed) {
        this.lastTimeAccessed = lastTimeAccessed;
    }
}
