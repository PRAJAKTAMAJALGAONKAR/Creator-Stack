package com.example.ems.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.ems.entity.Content;
import com.example.ems.repo.ContentRepository;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@RestController
@RequestMapping("/api/stripe")
public class StripePaymentController {

    @Autowired
    private ContentRepository contentRepo;

    @PostMapping("/create-checkout/{dataId}")
    public Map<String, String> createCheckout(@PathVariable Integer dataId) throws Exception {

        Content data = contentRepo.findById(dataId)
                .orElseThrow(() -> new RuntimeException("Resource not found"));

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setMode(SessionCreateParams.Mode.PAYMENT)

                        // Redirect to React Download
                        .setSuccessUrl(
                                "http://localhost:5173/download?session_id={CHECKOUT_SESSION_ID}"
                        )

                        .setCancelUrl("http://localhost:5173/buy")

                        //  Must match verify API
                        .putMetadata("contentId", dataId.toString())

                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(1L)
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency("inr")
                                                        .setUnitAmount(50000L)
                                                        .setProductData(
                                                                SessionCreateParams
                                                                        .LineItem
                                                                        .PriceData
                                                                        .ProductData
                                                                        .builder()
                                                                        .setName("Digital Download")
                                                                        .build()
                                                        )
                                                        .build()
                                        )
                                        .build()
                        )
                        .build();

        // Create Stripe Session
        Session session = Session.create(params);


        Map<String, String> response = new HashMap<>();
        response.put("checkoutUrl", session.getUrl());

        return response;
    }
}
