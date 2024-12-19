package com.example.app.url;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
public class UrlController {
    
    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/api/v1/url")
    public void addUrl(@RequestBody Url req) {
        urlService.addUrl(req);
    }

    @GetMapping("/{alias}")
    public RedirectView redirect(@PathVariable("alias") String alias) {
        return new RedirectView(urlService.getFullUrl(alias));
    }
}
