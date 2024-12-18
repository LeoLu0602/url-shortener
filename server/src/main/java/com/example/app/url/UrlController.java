package com.example.app.url;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/url")
public class UrlController {
    
    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @GetMapping
    public List<Url> getUrls() {
        return urlService.getUrls();
    }

    @PostMapping
    public void addUrl(@RequestBody Url url) {
        urlService.addUrl(url);
    }
}
