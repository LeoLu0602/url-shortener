package com.example.app.url;

import java.time.LocalDateTime;

import org.hibernate.annotations.DynamicInsert;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@DynamicInsert
@Table(name = "urls")
public class Url {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-generate ID (e.g., auto-increment)
    private Long id;
    private String alias;
    private String fullUrl;
    private Long userId;
    private LocalDateTime createdAt;
    private Long count;
    private LocalDateTime lastTimeAccessed;

    protected Url() {
        
    }

    public Url(String alias, String fullUrl) {
        this.alias = alias;
        this.fullUrl = fullUrl;
    }

    public Url(String alias, String fullUrl, Long userId) {
        this.alias = alias;
        this.fullUrl = fullUrl;
        this.userId = userId;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAlias() {
        return this.alias;
    }

    public void setAlias(String alias) {
        this.alias = alias;
    }

    public String getFullUrl() {
        return this.fullUrl;
    }

    public void setFullUrl(String fullUrl) {
        this.fullUrl = fullUrl;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDateTime getCreatedAt() {
        return this.createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public Long getCount() {
        return this.count;
    }

    public void setCount(Long count) {
        this.count = count; 
    }

    public LocalDateTime getLastTimeAccessed() {
        if (this.lastTimeAccessed == null) {
            return LocalDateTime.now();
        }

        return this.lastTimeAccessed;
    }

    public void setLastTimeAccessed(LocalDateTime lastTimeAccessed) {
        this.lastTimeAccessed = lastTimeAccessed;
    }

    @Override
    public String toString() {
        return 
            "id: " + this.id + ", " + 
            "alias: " + this.alias + ", " + 
            "full_url: " + this.fullUrl + ", " + 
            "user_id: " + this.userId + ", " + 
            "created_at: " + this.createdAt + ", " +
            "count: " + this.count + ", " +
            "last_time_accessed: " + this.lastTimeAccessed;
    }
}
