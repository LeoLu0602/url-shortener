package com.example.app.url;

import java.time.LocalDateTime;
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

    @Query(value = "SELECT url FROM Url url WHERE url.userId = :userId")
    List<Url> findByUserId(@Param("userId") Long userId);

    @Modifying
    @Transactional
    @Query(value = "UPDATE urls SET count = count + 1 WHERE alias = :alias", nativeQuery = true)
    void incrementCount(@Param("alias") String alias);

    @Modifying
    @Transactional
    @Query(value = "UPDATE urls SET last_time_accessed = :time WHERE alias = :alias", nativeQuery = true)
    void setLastTimeAccessed(@Param("alias") String alias, @Param("time") LocalDateTime time);
}
