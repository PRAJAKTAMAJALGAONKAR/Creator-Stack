package com.example.ems.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "payment")
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(optional = false)
	private SellLink sellLink;

	@ManyToOne
	@JoinColumn(name = "content_id")
	private Content content;


	@ManyToOne
	@JoinColumn(name = "creator_id")
	private Creator creator;


	@Column(nullable = false)
	private BigDecimal amount;

	@Column(nullable = false)
	private String stripeSessionId;

	@Column(nullable = false)
	private boolean paid = false;


	@Column(nullable = false)
	private boolean successful = false;

	private LocalDateTime paidAt;


	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public SellLink getSellLink() {
		return sellLink;
	}

	public void setSellLink(SellLink sellLink) {
		this.sellLink = sellLink;
	}

	public Content getContent() {
		return content;
	}

	public void setContent(Content content) {
		this.content = content;
	}

	public Creator getCreator() {
		return creator;
	}

	public void setCreator(Creator creator) {
		this.creator = creator;
	}

	public BigDecimal getAmount() {
		return amount;
	}

	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}

	public String getStripeSessionId() {
		return stripeSessionId;
	}

	public void setStripeSessionId(String stripeSessionId) {
		this.stripeSessionId = stripeSessionId;
	}

	public boolean isPaid() {
		return paid;
	}

	public void setPaid(boolean paid) {
		this.paid = paid;
	}

	public boolean isSuccessful() {
		return successful;
	}

	public void setSuccessful(boolean successful) {
		this.successful = successful;
	}

	public LocalDateTime getPaidAt() {
		return paidAt;
	}

	public void setPaidAt(LocalDateTime paidAt) {
		this.paidAt = paidAt;
	}


	public Payment() {
		super();
	}

	public Payment(Long id, SellLink sellLink, Content content, Creator creator,
				   BigDecimal amount, String stripeSessionId, boolean paid,
				   boolean successful, LocalDateTime paidAt) {
		this.id = id;
		this.sellLink = sellLink;
		this.content = content;
		this.creator = creator;
		this.amount = amount;
		this.stripeSessionId = stripeSessionId;
		this.paid = paid;
		this.successful = successful;
		this.paidAt = paidAt;
	}
}