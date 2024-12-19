package com.example.app.url;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UrlService {

    private final UrlRepository urlRepository;
    private static final String BASE_URL = "http://localhost:8080/";

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public void addUrl(Url req) {
        List<Url> sameProvidedShortUrlList = urlRepository.findByShortUrl(req.getShortUrl());

        if (!sameProvidedShortUrlList.isEmpty()) {
            // If a custom alias is already in use, reject the alias and return a bad request (400).
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Short URL already exists.");
        }

        Url toBeSaved = new Url(req.getShortUrl(), req.getFullUrl());

        if (req.getShortUrl().isEmpty()) {
            // If no custom alias is given, generate a random identifier.
            String shortUrl = this.generateShortUrl(req.getFullUrl());

            if (shortUrl.isEmpty()) {
                // toSHA256 doesn't work as expected.
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The server encountered an internal error.");
            }

            toBeSaved.setShortUrl(shortUrl);
        }

        List<Url> sameGeneratedShortUrlList = urlRepository.findByShortUrl(toBeSaved.getShortUrl());

        if (sameGeneratedShortUrlList.isEmpty()) {
            // shortUrl is unique.
            // Only save if the generated shortUrl is not already in use.
            // SHA-256 is deterministic, meaning that given the same input data, the output will always be identical.
            urlRepository.save(toBeSaved);
        }
    }

    public String generateShortUrl(String fullUrl) {
        String hash = this.toSHA265(fullUrl);
        
        if (hash.isEmpty()) {
            return "";
        }

        return BASE_URL + hash.substring(0, 10);
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

    public String getFullUrl(String alias) {
        List<Url> sameShortUrlList = urlRepository.findByShortUrl(BASE_URL + alias);

        if (sameShortUrlList.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Short URL does not exist.");
        } else {
            return sameShortUrlList.get(0).getFullUrl();
        }
    }
}
