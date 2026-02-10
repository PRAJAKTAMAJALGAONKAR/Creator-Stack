package com.example.ems.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ems.entity.ContentFile;
import com.example.ems.repo.ContentFileRepository;

@Service
public class ContentFileService {

    private final ContentFileRepository fileRepo;

    public ContentFileService(ContentFileRepository fileRepo) {
        this.fileRepo = fileRepo;
    }

    public List<ContentFile> getFilesByContentId(Integer contentId) {
        return fileRepo.findByContentId(contentId);
    }

    public ContentFile getById(Integer id) {
        return fileRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("File not found"));
    }
}
