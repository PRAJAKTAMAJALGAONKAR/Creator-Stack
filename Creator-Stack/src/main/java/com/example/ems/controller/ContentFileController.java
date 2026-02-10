package com.example.ems.controller;

import com.example.ems.entity.*;
import com.example.ems.service.ContentFileStorageService;
import com.example.ems.service.ContentService;
import com.example.ems.service.CreatorService;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/contents")
public class ContentFileController {

    private final ContentService contentService;
    private final ContentFileStorageService storageService;
    private final CreatorService creatorService;

    public ContentFileController(
            ContentService contentService,
            ContentFileStorageService storageService,
            CreatorService creatorService
    ) {
        this.contentService = contentService;
        this.storageService = storageService;
        this.creatorService = creatorService;
    }


    @PostMapping
    public ResponseEntity<?> createContent(@RequestBody Content content) {

        if (content.getCreator() == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Creator is required");
        }

        Creator creator = null;

        if (content.getCreator().getId() != null) {
            creator = creatorService.getById(content.getCreator().getId());
        }

        else if (content.getCreator().getUsername() != null) {
            creator = creatorService.getByUsername(content.getCreator().getUsername());
        }


        if (creator == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Creator not found");
        }

        content.setCreator(creator);

        Content saved = contentService.save(content);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(saved);
    }



    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Integer id) {
        return ResponseEntity.ok(contentService.getById(id));
    }

    @GetMapping("/creator/id/{id}")
    public ResponseEntity<?> getByCreatorId(@PathVariable Integer id) {
        return ResponseEntity.ok(contentService.getByCreatorId(id));
    }

    @GetMapping("/api/content/buy/{token}")
    public ResponseEntity<?> getByToken(
            @PathVariable String token
    ) {

        try {
            Content content = contentService.getByToken(token);
            return ResponseEntity.ok(content);

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Invalid or expired link");
        }
    }

    @GetMapping("/creator/username/{username}")
    public ResponseEntity<?> getByCreatorUsername(@PathVariable String username) {
        Creator creator = creatorService.getByUsername(username);

        if (creator == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Creator not found");
        }

        return ResponseEntity.ok(contentService.getByCreatorId(creator.getId()));
    }

    @GetMapping("/buy/creator/{creatorId}")
    public ResponseEntity<?> getContentForBuy(@PathVariable Integer creatorId) {

        Creator creator = creatorService.getById(creatorId);
        if (creator == null) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Creator not found");
        }

        // Get creator's contents
        List<Content> contents = contentService.getByCreatorId(creatorId);

        if (contents.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("No content found for creator");
        }

        return ResponseEntity.ok(contents.get(0));
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Integer id) {
        contentService.deleteContent(id);
        return ResponseEntity.ok("Deleted");
    }



    @PostMapping(
            value = "/{contentId}/files",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<?> uploadFile(
            @PathVariable Integer contentId,
            @RequestParam("file") MultipartFile file,
            @RequestParam(required = false) FileType fileType
    ) {

        try {

            Content content = contentService.getById(contentId);

            if (content == null) {
                return ResponseEntity
                        .status(HttpStatus.NOT_FOUND)
                        .body("Content not found");
            }


            if (fileType == null) {
                fileType = FileType.fromMime(file.getContentType());
            }


            ContentFile saved = storageService.upload(content, file, fileType);


            ContentFileResponse response = ContentFileResponse.from(saved);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(response);

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File upload failed: " + e.getMessage());
        }
    }


    @DeleteMapping("/files/{fileId}")
    public ResponseEntity<?> deleteFile(@PathVariable Integer fileId) {
        try {
            storageService.delete(fileId);
            return ResponseEntity.ok("File deleted from MinIO and database");
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File deletion failed: " + e.getMessage());
        }
    }
}