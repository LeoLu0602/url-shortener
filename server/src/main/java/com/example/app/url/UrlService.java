package com.example.app.url;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UrlService {

    private final UrlRepository urlRepository;

    public UrlService(UrlRepository urlRepository) {
        this.urlRepository = urlRepository;
    }

    public String addUrl(AddUrlRequest req) {
        String customAlias = req.getAlias().strip();
        String fullUrl = req.getFullUrl().strip();
        Long userId = req.getUserId();

        if (!customAlias.isEmpty()) {
            if (!urlRepository.findByAlias(customAlias).isEmpty()) {
                // If a custom alias is already in use, reject the alias and return a bad request (400).
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alias already exists.");
            }
            
            // The custom alias is not in use, save it.
            if (userId == -1L) {
                urlRepository.save(new Url(customAlias, fullUrl));
            } else {
                urlRepository.save(new Url(customAlias, fullUrl, userId));
            }

            return customAlias;
        } 

        // If no custom alias is given, generate one.
        String generatedAlias = this.generateAlias(fullUrl);

        if (generatedAlias.isEmpty()) {
            // toSHA256 doesn't work as expected.
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "The server encountered an internal error.");
        }

        // The combination of alias and userId is unique.
        if (userId == -1L && urlRepository.findByAlias(generatedAlias).isEmpty()) {
            urlRepository.save(new Url(generatedAlias, fullUrl));
        }
        
        if (userId != -1L && urlRepository.findByAliasAndUserId(generatedAlias, userId).isEmpty()) {
            urlRepository.save(new Url(generatedAlias, fullUrl, userId));
        }
        
        return generatedAlias;
    }

    public String generateAlias(String fullUrl) {
        String hash = this.toSHA256(fullUrl);
        
        if (hash.isEmpty()) {
            // Something went wrong.
            return "";
        }

        return hash.substring(0, 10);
    }

    public String toSHA256(String input) {
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
        List<Url> rowsWithSameAlias = urlRepository.findByAlias(alias);

        if (rowsWithSameAlias.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alias does not exist.");
        } else {
            return rowsWithSameAlias.get(0).getFullUrl();
        }
    }

    public void incrementCount(String alias) {
        urlRepository.incrementCount(alias);
    }

    public void setLastTimeAccessed(String alias, LocalDateTime time) {
        urlRepository.setLastTimeAccessed(alias, time);
    }

    public Url getAnalytics(String alias) {
        List<Url> rows = urlRepository.findByAlias(alias);

        if (rows.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Alias does not exist.");
        } 

        return rows.get(0);
    }
}
