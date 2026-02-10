package com.example.ems.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ems.entity.Content;
import com.example.ems.entity.SellLink;
import com.example.ems.repo.SellLinkRepository;
import com.example.ems.service.StripePaymentService;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/buy")
@CrossOrigin(origins = "http://localhost:5173")
public class SellLinkRedirectController {

    private final SellLinkRepository sellLinkRepo;
    private final StripePaymentService stripePaymentService;

    public SellLinkRedirectController(
            SellLinkRepository sellLinkRepo,
            StripePaymentService stripePaymentService) {
        this.sellLinkRepo = sellLinkRepo;
        this.stripePaymentService = stripePaymentService;
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getContentAndCheckout(
            @PathVariable String slug,
            @RequestParam String token) {

        // Validate sell link
        SellLink link = sellLinkRepo
                .findBySlugAndToken(slug, token)
                .orElseThrow(() -> new RuntimeException("Invalid sell link"));

        if (!link.isActive()) {
            return ResponseEntity.badRequest().body(
                    Map.of("error", "Sell link is disabled")
            );
        }

        //Get content details
        Content content = link.getContent();

        //  Create Stripe checkout session
        String checkoutUrl = stripePaymentService.createCheckoutSession(link);

        // Return both content info and checkout URL
        Map<String, Object> response = new HashMap<>();

        // Content details for display
        Map<String, Object> contentInfo = new HashMap<>();
        contentInfo.put("id", content.getId());
        contentInfo.put("prompt", content.getPrompt());
        contentInfo.put("price", content.getPrice());

        response.put("content", contentInfo);
        response.put("checkoutUrl", checkoutUrl);

        return ResponseEntity.ok(response);
    }
}