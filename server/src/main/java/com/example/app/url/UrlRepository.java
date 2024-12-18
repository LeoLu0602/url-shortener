package com.example.app.url;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UrlRepository extends JpaRepository<Url, Integer> {
    Optional<Url> findUrlByShortUrl(String shortUrl);
    Optional<Url> findUrlByFullUrl(String fullUrl);
}
