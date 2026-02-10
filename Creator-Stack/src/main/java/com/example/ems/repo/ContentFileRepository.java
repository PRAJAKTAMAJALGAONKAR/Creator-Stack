package com.example.ems.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ems.entity.ContentFile;

public interface ContentFileRepository extends JpaRepository<ContentFile, Integer> {

	List<ContentFile> findByContentId(Integer contentId);
	void deleteByContentId(Integer contentId);

}
