package com.example.ems.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "creator")
public class Creator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "mobile")
    private String mobile;
    
    @Column(name = "stripe_account_id")
    private String stripeAccountId;

    @Enumerated(EnumType.STRING)
    private OnboardingStatus onboardingStatus;

    @Column(length = 1000)
    private String onboardingUrl;

    private boolean chargesEnabled;
    private boolean payoutsEnabled;


    public Creator() {}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}


	public String getStripeAccountId() {
		return stripeAccountId;
	}

	public void setStripeAccountId(String stripeAccountId) {
		this.stripeAccountId = stripeAccountId;
	}

	public OnboardingStatus getOnboardingStatus() {
		return onboardingStatus;
	}

	public void setOnboardingStatus(OnboardingStatus onboardingStatus) {
		this.onboardingStatus = onboardingStatus;
	}

	public String getOnboardingUrl() {
		return onboardingUrl;
	}

	public void setOnboardingUrl(String onboardingUrl) {
		this.onboardingUrl = onboardingUrl;
	}

	public boolean isChargesEnabled() {
		return chargesEnabled;
	}

	public void setChargesEnabled(boolean chargesEnabled) {
		this.chargesEnabled = chargesEnabled;
	}

	public boolean isPayoutsEnabled() {
		return payoutsEnabled;
	}

	public void setPayoutsEnabled(boolean payoutsEnabled) {
		this.payoutsEnabled = payoutsEnabled;
	}

	public Creator(Integer id, String username, String password, String email, String mobile, String stripeAccountId,
			OnboardingStatus onboardingStatus, String onboardingUrl, boolean chargesEnabled, boolean payoutsEnabled) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.email = email;
		this.mobile = mobile;
		this.stripeAccountId = stripeAccountId;
		this.onboardingStatus = onboardingStatus;
		this.onboardingUrl = onboardingUrl;
		this.chargesEnabled = chargesEnabled;
		this.payoutsEnabled = payoutsEnabled;
	}
    


    
}
