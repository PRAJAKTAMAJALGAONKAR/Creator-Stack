package com.example.ems.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import com.example.ems.entity.*;
//import com.example.ems.service.ContentService;
//import com.example.ems.service.CreatorService;
//
//@RestController
//@RequestMapping("/content")
//public class ContentController {
//
//    private final ContentService contentService;
//    private final CreatorService creatorService;
//
//    public ContentController(ContentService contentService,
//                             CreatorService creatorService) {
//        this.contentService = contentService;
//        this.creatorService = creatorService;
//    }
//
//    @PostMapping("/upload")
//    public ResponseEntity<?> uploadContent(
//            @RequestParam String prompt,
//            @RequestParam Integer price,
//            @RequestParam FileType fileType,
//            @RequestParam List<MultipartFile> files,
//            @RequestParam String creatorUsername   // ✅ correct
//    ) throws Exception {
//
//        // 1️⃣ Fetch creator properly
//        Creator creator = creatorService.getCreator(creatorUsername);
//
//        // 2️⃣ Create content
//        Content content = new Content();
//        content.setPrompt(prompt);
//        content.setPrice(price);
//        content.setCreator(creator);
import org.springframework.web.bind.annotation.RequestParam;

import com.example.ems.service.ContentService;

//        List<ContentFile> contentFiles = new ArrayList<>();
//
//        for (MultipartFile file : files) {
//
//            String mime = file.getContentType();
//
//            FileType detected = FileType.fromMime(mime);
//            if (detected != fileType) {
//                throw new RuntimeException("File type mismatch");
//            }
//
//            ContentFile cf = new ContentFile();
//            cf.setFileType(fileType);
//            cf.setMimeType(mime);
//            cf.setSize(file.getSize());
//            cf.setData(file.getBytes());
//            cf.setContent(content);
//
//            contentFiles.add(cf);
//        }
//
//        content.setFiles(contentFiles);

        // 3️⃣ Save content
//        contentService.save(content);
//
//        return ResponseEntity.ok("Content uploaded successfully");
//    }
@Controller
@RequestMapping("/creator")
public class ContentController {

    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/content/delete")
    public String deleteContent(
            @RequestParam Integer contentId
    ) {
        contentService.deleteContent(contentId);
        return "redirect:/creator/dashboard";
    }
}




