package com.example.ems;

import java.util.UUID;

import org.springframework.stereotype.Component;

import com.example.ems.entity.FileType;

@Component
public class ObjectKeyGenerator {

    public String generate(
            Integer creatorId,
            Integer contentId,
            FileType fileType,
            String originalFilename
    ) {
        String extension = getExtension(originalFilename);
        String uuid = UUID.randomUUID().toString();

        return String.format(
            "creators/%d/content/%d/%s/%s.%s",
            creatorId,
            contentId,
            fileType.name().toLowerCase(),
            uuid,
            extension
        );
    }

    private String getExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "bin";
        }
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
}
