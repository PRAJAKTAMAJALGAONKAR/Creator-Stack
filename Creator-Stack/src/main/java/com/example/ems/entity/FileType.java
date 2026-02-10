package com.example.ems.entity;

import java.util.Set;

public enum FileType {

    DOCUMENT(Set.of("application/pdf")),
    IMAGE(Set.of("image/")),
    VIDEO(Set.of("video/")),
    AUDIO(Set.of("audio/")),
    TEXT(Set.of("text/")),
    ARCHIVE(Set.of("application/zip", "application/x-zip-compressed"));

    private final Set<String> mimeMatchers;

    FileType(Set<String> mimeMatchers) {
        this.mimeMatchers = mimeMatchers;
    }

    public static FileType fromMime(String mime) {
        for (FileType c : values()) {
            for (String m : c.mimeMatchers) {
                if (mime.startsWith(m)) {
                    return c;
                }
            }
        }
        throw new IllegalArgumentException("Unsupported mime: " + mime);
    }
}

