package com.example.ems.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "content_files")
public class ContentFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private FileType fileType;   // PDF, IMAGE, VIDEO, AUDIO

    @Column(nullable = false)
    private String mimeType;     // application/pdf, video/mp4

    private Long size;           // bytes

 // where the file is stored
    @Column(nullable = false)
    private String bucket;



    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] data;

    // unique path inside bucket
    @Column(nullable = false)
    private String objectKey;

    // optional: public or signed URL cache (optional)
    @Column(length = 1024)
    private String objectUrl;


    @ManyToOne
    @JoinColumn(name = "content_id", nullable = false)
    @JsonBackReference
    private Content content;

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }


    public Integer getId() {
        return id;
    }

    public ContentFile() {
		super();
	}

	public void setId(Integer id) {
        this.id = id;
    }

    public FileType getFileType() {
        return fileType;
    }

    public void setFileType(FileType fileType) {
        this.fileType = fileType;
    }

    public String getMimeType() {
        return mimeType;
    }

    public void setMimeType(String mimeType) {
        this.mimeType = mimeType;
    }

    public Long getSize() {
        return size;
    }

    public void setSize(Long size) {
        this.size = size;
    }
    
    public ContentFile(Integer id, FileType fileType, String mimeType, Long size, String bucket, String objectKey,
			String objectUrl, Content content) {
		super();
		this.id = id;
		this.fileType = fileType;
		this.mimeType = mimeType;
		this.size = size;
		this.bucket = bucket;
		this.objectKey = objectKey;
		this.objectUrl = objectUrl;
		this.content = content;
	}

	public String getBucket() {
		return bucket;
	}

	public void setBucket(String bucket) {
		this.bucket = bucket;
	}

	public String getObjectKey() {
		return objectKey;
	}

	public void setObjectKey(String objectKey) {
		this.objectKey = objectKey;
	}

	public String getObjectUrl() {
		return objectUrl;
	}

	public void setObjectUrl(String objectUrl) {
		this.objectUrl = objectUrl;
	}

	public Content getContent() {
        return content;
    }

    public void setContent(Content content) {
        this.content = content;
    }
}
