package com.example.ems.controller;

import com.example.ems.service.StripeWebhookService;
import com.stripe.exception.SignatureVerificationException;
import com.stripe.model.Event;
import com.stripe.net.Webhook;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

@RestController
@RequestMapping("/webhooks/stripe")
public class StripeWebhookController {

    private final StripeWebhookService webhookService;

    @Value("${stripe.webhook.secret}")
    private String stripeWebhookSecret;

    public StripeWebhookController(StripeWebhookService webhookService) {
        this.webhookService = webhookService;
    }

    @PostMapping
    public ResponseEntity<String> handleWebhook(HttpServletRequest request) {

        String payload;
        try {
            payload = StreamUtils.copyToString(
                    request.getInputStream(),
                    StandardCharsets.UTF_8
            );
        } catch (IOException e) {
            return ResponseEntity.badRequest().body("Invalid payload");
        }

        String sigHeader = request.getHeader("Stripe-Signature");
        if (sigHeader == null) {
            return ResponseEntity.badRequest().body("Missing Stripe-Signature");
        }

        Event event;
        try {
            event = Webhook.constructEvent(
                    payload,
                    sigHeader,
                    stripeWebhookSecret
            );
        } catch (SignatureVerificationException e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }


        webhookService.processEvent(event);

        return ResponseEntity.ok("ok");
    }
}
