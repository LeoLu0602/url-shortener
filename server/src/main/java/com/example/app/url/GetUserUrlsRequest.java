package com.example.app.url;

public class GetUserUrlsRequest {
    private Long userId;

    public GetUserUrlsRequest(Long userId) {
        this.userId = userId;
    }

    public Long getUserId() {
        return this.userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
