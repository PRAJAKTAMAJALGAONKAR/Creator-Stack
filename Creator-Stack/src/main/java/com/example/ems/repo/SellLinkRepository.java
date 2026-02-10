package com.example.ems.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.ems.entity.SellLink;

public interface SellLinkRepository extends JpaRepository<SellLink, Long> {

    Optional<SellLink> findByToken(String token);

    Optional<SellLink> findBySlugAndToken(String slug, String token);


    List<SellLink> findAllByContent_Id(Integer contentId);

    Optional<SellLink> findByContent_Id(Integer contentId);

    @Modifying
    @Transactional
    @Query("DELETE FROM SellLink s WHERE s.content.id = :contentId")
    void deleteByContentId(Integer contentId);
}
