package com.example.ems.service;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.example.ems.ObjectKeyGenerator;
import com.example.ems.entity.Content;
import com.example.ems.entity.ContentFile;
import com.example.ems.entity.FileType;
import com.example.ems.repo.ContentFileRepository;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
@Transactional
public class ContentFileStorageService {

    private static final String BUCKET = "mybucket";

    private final S3Client s3Client;
    private final ContentFileRepository contentFileRepo;
    private final ObjectKeyGenerator keyGenerator;

    public ContentFileStorageService(
            S3Client s3Client,
            ContentFileRepository contentFileRepo,
            ObjectKeyGenerator keyGenerator
    ) {
        this.s3Client = s3Client;
        this.contentFileRepo = contentFileRepo;
        this.keyGenerator = keyGenerator;
    }

    public ContentFile upload(
            Content content,
            MultipartFile file,
            FileType fileType
    ) {


        String objectKey = keyGenerator.generate(
                content.getCreator().getId(),
                content.getId(),
                fileType,
                file.getOriginalFilename()
        );

        try {

        putToObjectStorage(file, objectKey);


        ContentFile cf = new ContentFile();
        cf.setContent(content);
        cf.setFileType(fileType);
        cf.setMimeType(file.getContentType());
        cf.setSize(file.getSize());
        cf.setBucket(BUCKET);
        cf.setObjectKey(objectKey);
        
        return contentFileRepo.save(cf);
        } catch (Exception e) {
        	safeDeleteFromMinio(objectKey);

            throw e;
        }
 }

    private void safeDeleteFromMinio(String objectKey) {
		// TODO Auto-generated method stub
        try {
            s3Client.deleteObject(
                DeleteObjectRequest.builder()
                    .bucket(BUCKET)
                    .key(objectKey)
                    .build()
            );
        } catch (Exception ex) {

        }
 }

	private void putToObjectStorage(
            MultipartFile file,
            String objectKey
    ) {

        try (InputStream in = file.getInputStream()) {

            PutObjectRequest request =
                    PutObjectRequest.builder()
                            .bucket(BUCKET)
                            .key(objectKey)
                            .contentType(file.getContentType())
                            .contentLength(file.getSize())
                            .build();

            s3Client.putObject(
                    request,
                    RequestBody.fromInputStream(in, file.getSize())
            );

        } catch (IOException e) {
            throw new RuntimeException("File upload failed", e);
        }
    }
	@Transactional
	public void delete(Integer fileId) {

	    ContentFile file = contentFileRepo.findById(fileId)
	            .orElseThrow(() -> new RuntimeException("File not found"));


	    try {
	        s3Client.deleteObject(
	                DeleteObjectRequest.builder()
	                        .bucket(file.getBucket())
	                        .key(file.getObjectKey())
	                        .build()
	        );
	    } catch (Exception e) {
	        throw new RuntimeException("Failed to delete file from storage", e);
	    }


	    contentFileRepo.delete(file);
	}




}
