package com.example.ems.service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ems.entity.Content;
import com.example.ems.entity.ContentFile;
import com.example.ems.repo.ContentFileRepository;
import com.example.ems.repo.ContentRepository;
import com.example.ems.repo.SellLinkRepository;

import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;

@Service
public class ContentService {

    private final ContentRepository contentRepo;
    private final ContentFileRepository fileRepo;
    private final SellLinkRepository sellLinkRepo;
    private final S3Client s3Client;

    private static final String BUCKET = "mybucket";

    public ContentService(ContentRepository contentRepo,
                          ContentFileRepository fileRepo,
                          SellLinkRepository sellLinkRepo,
                          S3Client s3Client) {
        this.contentRepo = contentRepo;
        this.fileRepo = fileRepo;
        this.sellLinkRepo = sellLinkRepo;
        this.s3Client = s3Client;
    }

    @Transactional
    public Content save(Content content) {
        return contentRepo.save(content);
    }

    public Content getById(Integer id) {
        return contentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Content not found"));
    }

    public List<Content> getAll() {
        return contentRepo.findAll();
    }

    public List<Content> getByCreatorId(Integer creatorId) {
        return contentRepo.findByCreatorId(creatorId);
    }

    @Transactional
    public void deleteContent(Integer contentId) {

        Content content = contentRepo.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));

        if (content.getFiles() != null) {
            for (ContentFile file : content.getFiles()) {
                safeDeleteFromMinio(file.getObjectKey());
            }
        }

        contentRepo.delete(content);
    }


    private void safeDeleteFromMinio(String objectKey) {
        try {
            s3Client.deleteObject(
                DeleteObjectRequest.builder()
                        .bucket(BUCKET)
                        .key(objectKey)
                        .build()
            );
        } catch (Exception e) {

            System.err.println("MinIO delete failed for: " + objectKey);
        }
    }
    private String generateToken() {
        return UUID.randomUUID()
                .toString()
                .replace("-", "")
                .substring(0, 12);
    }


    public Content getByToken(String token) {

        return contentRepo.findByShareToken(token)
                .orElseThrow(() ->
                        new RuntimeException("Invalid or expired link"));
    }

}
