package com.example.app.url;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "api/v1/url")
public class UrlController {
    
    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping
    public void addUrl(@RequestBody Url url) {
        urlService.addUrl(url);
    }

    @GetMapping
    public void redirect(@RequestParam(value = "fullUrl", defaultValue = "") String fullUrl) {
        urlService.redirect(fullUrl);
    }
}
