package com.example.app.url;

import java.time.LocalDateTime;
import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UrlController {
    
    private final UrlService urlService;

    public UrlController(UrlService urlService) {
        this.urlService = urlService;
    }

    @PostMapping("/api/v1/url/add")
    public HashMap<String, String> addUrl(@RequestBody AddUrlRequest req) {
        HashMap<String, String> res = new HashMap<>();
        String alias = urlService.addUrl(req);

        res.put("alias", alias);

        return res;
    }

    @GetMapping("/api/v1/url/analytics")
    public Url getAnalytics(@RequestParam(value = "alias", defaultValue = "") String alias) {
        return urlService.getAnalytics(alias);
    }

    @GetMapping("/{alias}")
    public RedirectView redirect(@PathVariable("alias") String alias) {
        urlService.incrementCount(alias);
        urlService.setLastTimeAccessed(alias, LocalDateTime.now());

        return new RedirectView(urlService.getFullUrl(alias));
    }
}
