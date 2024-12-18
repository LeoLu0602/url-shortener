package com.example.app.url;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public void addUrl(Url url) {
        Optional<Url> urlOptional = urlRepository.findUrlByShortUrl(url.getShortUrl());

        if (urlOptional.isPresent()) {
            // If a custom alias is already in use, reject the alias and return a bad request (400).
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Short URL already exists.");
        }

        Url newUrl = new Url(url.getShortUrl(), url.getFullUrl());

        if (url.getShortUrl().isEmpty()) {
            // If no custom alias is given, generate a random identifier.
            String shortUrl = this.generateShortUrl(url.getFullUrl());

            if (shortUrl.isEmpty()) {
                // toSHA256 doesn't work as expected.
                ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("The server encountered an internal error.");
            }

            newUrl.setShortUrl(shortUrl);
        }

        Optional<Url> newUrlOptional = urlRepository.findUrlByShortUrl(newUrl.getShortUrl());

        if (!newUrlOptional.isPresent()) {
            // shortUrl is unique.
            // Only save if the generated shortUrl is not already in use.
            // SHA-256 is deterministic, meaning that given the same input data, the output will always be identical.
            urlRepository.save(newUrl);
        }
    }

    public String generateShortUrl(String fullUrl) {
        String baseUrl = "http://localhost:8080/";
        String hash = this.toSHA265(fullUrl);
        
        if (hash.isEmpty()) {
            return "";
        }

        return baseUrl + hash.substring(0, 10);
    }

    public String toSHA265(String input) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(input.getBytes());
            StringBuilder hexString = new StringBuilder();

            for (byte b : hashBytes) {
                hexString.append(String.format("%02x", b));
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            return "";
        }
    }

    public void redirect(String fullUrl) {
        Optional<Url> urlOptional = urlRepository.findUrlByFullUrl(fullUrl);

    }
}
