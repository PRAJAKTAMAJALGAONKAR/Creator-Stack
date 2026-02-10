package com.example.ems.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;  // ✅ Add this import
import jakarta.persistence.*;

@Entity
@Table(name = "sell_link")
public class SellLink {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	@JsonBackReference
	private Content content;

	@Column(nullable = false)
	private String slug;

	@ManyToOne(optional = false)
	@JoinColumn(name = "creator_id", nullable = false)
	private Creator creator;

	public Creator getCreator() {
		return creator;
	}

	public void setCreator(Creator creator) {
		this.creator = creator;
	}

	@Column(nullable = false, unique = true)
	private String token;

	@Column(nullable = false)
	private boolean active = true;

	private LocalDateTime createdAt = LocalDateTime.now();



	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(LocalDateTime createdAt) {
		this.createdAt = createdAt;
	}

	public SellLink(Long id, Content content, String slug, String token, boolean active, LocalDateTime createdAt) {
		super();
		this.id = id;
		this.content = content;
		this.slug = slug;
		this.token = token;
		this.active = active;
		this.createdAt = createdAt;
	}

	public SellLink() {
		super();
	}

	@Transient
	public String getUrl() {
		return "/buy/" + slug + "?token=" + token;
	}
}
