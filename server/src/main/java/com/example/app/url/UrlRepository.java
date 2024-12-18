package com.example.app.url;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface UrlRepository extends CrudRepository<Url, Long> {
    List<Url> findByShortUrl(String shortUrl);
}
