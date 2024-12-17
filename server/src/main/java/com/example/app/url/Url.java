package com.example.app.url;

import java.time.LocalDate;

public class Url {
    private int id;
    private String short_url;
    private String full_url;
    private int user_id;
    private LocalDate created_at;

    public Url() {

    }

    public Url(int id, String short_url, String full_url, int user_id, LocalDate created_at) {
        this.id = id;
        this.short_url = short_url;
        this.full_url = full_url;
        this.user_id = user_id;
        this.created_at = created_at;
    }

    public Url(String short_url, String full_url, int user_id, LocalDate created_at) {
        this.short_url = short_url;
        this.full_url = full_url;
        this.user_id = user_id;
        this.created_at = created_at;
    }

    public int getId() {
        return this.id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getShortUrl() {
        return this.short_url;
    }

    public void setShortUrl(String short_url) {
        this.short_url = short_url;
    }

    public String getFullUrl() {
        return this.full_url;
    }

    public void setFullUrl(String full_url) {
        this.full_url = full_url;
    }

    public int getUserId() {
        return this.user_id;
    }

    public void setUserId(int user_id) {
        this.user_id = user_id;
    }

    public LocalDate getCreatedAt() {
        return this.created_at;
    }

    public void setCreatedAt(LocalDate created_at) {
        this.created_at = created_at;
    }

    @Override
    public String toString() {
        return this.id + " " + this.short_url + " " + this.full_url + " " + this.user_id + " " + this.created_at;
    }
}
