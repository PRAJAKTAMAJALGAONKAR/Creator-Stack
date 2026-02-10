package com.example.ems.entity;

public class ContentFileResponse {

    private Integer id;
    private FileType fileType;
    private String mimeType;
    private Long size;
    private String objectKey;

    public static ContentFileResponse from(ContentFile cf) {
        ContentFileResponse dto = new ContentFileResponse();
        dto.id = cf.getId();
        dto.fileType = cf.getFileType();
        dto.mimeType = cf.getMimeType();
        dto.size = cf.getSize();
        dto.objectKey = cf.getObjectKey();
        return dto;
    }

	public Integer getId() {
		return id;
	}

	public FileType getFileType() {
		return fileType;
	}

	public String getMimeType() {
		return mimeType;
	}

	public Long getSize() {
		return size;
	}

	public String getObjectKey() {
		return objectKey;
	}

    
}
