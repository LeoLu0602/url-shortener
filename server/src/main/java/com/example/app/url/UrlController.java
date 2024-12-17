package com.example.app.url;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/url")
public class UrlController {
    @GetMapping
    public String hello() {
        return "Hello";
    }
}
