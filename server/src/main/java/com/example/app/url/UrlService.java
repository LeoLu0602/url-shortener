package com.example.app.url;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public List<Url> getUrls() {
        return urlRepository.findAll();
    }

    public void addUrl(Url url) {
        Optional<Url> urlOptional = urlRepository.findUrlByShortUrl(url.getShortUrl());

        if (urlOptional.isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Short URL already exists.");
        }
    }
}
