package com.example.ems.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.ems.entity.DownloadToken;

public interface DownloadTokenRepository extends JpaRepository<DownloadToken,Long>{
	
}