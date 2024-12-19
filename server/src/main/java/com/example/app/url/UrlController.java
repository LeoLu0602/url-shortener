package com.example.app.url;

import java.util.HashMap;

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
    public HashMap<String, String> addUrl(@RequestBody Url req) {
        HashMap<String, String> res = new HashMap<>();
        String shortUrl = urlService.addUrl(req);

        res.put("shortUrl", shortUrl);

        return res;
    }

    @GetMapping("/{alias}")
    public RedirectView redirect(@PathVariable("alias") String alias) {
        return new RedirectView(urlService.getFullUrl(alias));
    }
}
