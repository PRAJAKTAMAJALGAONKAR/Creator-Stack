package com.example.ems.entity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonManagedReference;  // ✅ Add this import
import jakarta.persistence.*;

@Entity
@Table(name = "content")
public class Content {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String prompt;

    @Column(nullable = false)
    private Integer price;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private Creator creator;

    @OneToMany(
            mappedBy = "content",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<ContentFile> files = new ArrayList<>();

    @OneToMany(
            mappedBy = "content",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonManagedReference
    private List<SellLink> sellLinks = new ArrayList<>();

    @Column(name = "share_token", nullable = false, unique = true)
    private String shareToken;

    @PrePersist
    protected void onCreate() {
        if (this.shareToken == null || this.shareToken.isEmpty()) {
            this.shareToken = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        }
    }



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public Integer getPrice() {
        return price;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public Creator getCreator() {
        return creator;
    }

    public void setCreator(Creator creator) {
        this.creator = creator;
    }

    public List<ContentFile> getFiles() {
        return files;
    }

    public void setFiles(List<ContentFile> files) {
        this.files = files;
    }

    public List<SellLink> getSellLinks() {
        return sellLinks;
    }

    public void setSellLinks(List<SellLink> sellLinks) {
        this.sellLinks = sellLinks;
    }

    public String getShareToken() {
        return shareToken;
    }

    public void setShareToken(String shareToken) {
        this.shareToken = shareToken;
    }
}
