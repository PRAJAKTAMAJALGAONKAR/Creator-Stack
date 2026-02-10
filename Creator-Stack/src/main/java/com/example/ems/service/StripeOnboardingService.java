package com.example.ems.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.ems.entity.Creator;
import com.example.ems.repo.CreatorRepo;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Account;
import com.stripe.model.AccountLink;
import com.stripe.param.AccountCreateParams;
import com.stripe.param.AccountLinkCreateParams;

import jakarta.annotation.PostConstruct;

@Service
public class StripeOnboardingService {

    private final CreatorRepo creatorRepo;

    // ✅ Changed from stripe.api.key to stripe.secret.key
    @Value("${stripe.secret.key}")
    private String stripeApiKey;

    public StripeOnboardingService(CreatorRepo creatorRepo) {
        this.creatorRepo = creatorRepo;
    }

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public String createOnboardingLink(Creator creator) {

        try {


            if (creator.getStripeAccountId() == null || creator.getStripeAccountId().isEmpty()) {

                System.out.println("Creating new Stripe account for: " + creator.getEmail());

                AccountCreateParams params =
                        AccountCreateParams.builder()
                                .setType(AccountCreateParams.Type.EXPRESS)
                                .setCountry("SG") // India
                                .setEmail(creator.getEmail())
                                .setCapabilities(
                                        AccountCreateParams.Capabilities.builder()
                                                .setCardPayments(
                                                        AccountCreateParams.Capabilities.CardPayments.builder()
                                                                .setRequested(true)
                                                                .build()
                                                )
                                                .setTransfers(
                                                        AccountCreateParams.Capabilities.Transfers.builder()
                                                                .setRequested(true)
                                                                .build()
                                                )
                                                .build()
                                )
                                .build();

                Account account = Account.create(params);

                creator.setStripeAccountId(account.getId());
                creatorRepo.saveAndFlush(creator);

                System.out.println("Stripe account created: " + account.getId());
            } else {
                System.out.println("Using existing Stripe account: " + creator.getStripeAccountId());
            }


            AccountLinkCreateParams linkParams =
                    AccountLinkCreateParams.builder()
                            .setAccount(creator.getStripeAccountId())
                            .setRefreshUrl("http://localhost:5173/creator/dashboard")
                            .setReturnUrl("http://localhost:5173/creator/dashboard")
                            .setType(AccountLinkCreateParams.Type.ACCOUNT_ONBOARDING)
                            .build();

            AccountLink link = AccountLink.create(linkParams);

            System.out.println("Onboarding link created: " + link.getUrl());

            return link.getUrl();

        } catch (StripeException e) {
            System.err.println("Stripe API Error: " + e.getMessage());
            System.err.println("Error Code: " + e.getCode());
            throw new RuntimeException("Stripe onboarding failed: " + e.getMessage(), e);
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Onboarding failed: " + e.getMessage(), e);
        }
    }
}