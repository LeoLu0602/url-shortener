package com.example.app.url;

import java.util.List;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


@Repository
public interface UrlRepository extends CrudRepository<Url, Long> {
    List<Url> findByAlias(String alias);

    @Modifying
    @Transactional
    @Query(value = "UPDATE urls SET count = count + 1 WHERE alias = :alias", nativeQuery = true)
    void incrementCount(@Param("alias") String alias);
}
