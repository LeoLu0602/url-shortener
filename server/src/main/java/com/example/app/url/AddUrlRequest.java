package com.example.app.url;

public class AddUrlRequest {
    private String alias;
    private String fullUrl;
    private Long userId;

    public AddUrlRequest(String alias, String fullUrl, Long userId) {
        this.alias = alias;
        this.fullUrl = fullUrl;
        this.userId = userId;
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
        if (userId == null) {
            this.userId = -1L;
        } else {
            this.userId = userId;
        }
    }
}
