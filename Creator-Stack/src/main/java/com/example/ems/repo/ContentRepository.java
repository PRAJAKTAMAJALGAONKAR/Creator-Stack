package com.example.ems.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ems.entity.Content;


public interface ContentRepository extends JpaRepository<Content, Integer> {

	List<Content> findByCreatorId(Integer creatorId);
	Optional<Content> findByShareToken(String shareToken);
}
