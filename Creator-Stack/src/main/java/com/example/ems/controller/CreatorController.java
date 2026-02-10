//package com.example.ems.controller;
//
//import java.util.Map;
//
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Controller;
//import org.springframework.web.bind.annotation.*;
//
//import com.example.ems.entity.Creator;
//import com.example.ems.repo.CreatorRepo;
//import com.example.ems.service.CreatorService;
//import com.example.ems.service.StripeOnboardingService;
//
//@Controller
//@RequestMapping("/api/creator")
//@CrossOrigin(origins = "http://localhost:5173")
//public class CreatorController {
//
//    private final CreatorService creatorService;
//    private final StripeOnboardingService stripeOnboardingService;
//    private final CreatorRepo creatorRepo;
//
//    public CreatorController(
//            CreatorService creatorService,
//            StripeOnboardingService stripeOnboardingService,
//            CreatorRepo creatorRepo) {
//        this.creatorService = creatorService;
//        this.stripeOnboardingService = stripeOnboardingService;
//        this.creatorRepo = creatorRepo;
//    }
//
//    // ✅ REST API endpoint for React frontend
//    @PostMapping("/register")
//    @ResponseBody
//    public ResponseEntity<?> registerCreator(@RequestBody Creator creator) {
//        try {
//            Creator savedCreator = creatorService.registerCreator(creator);
//
//            return ResponseEntity.ok(Map.of(
//                    "id", savedCreator.getId(),
//                    "username", savedCreator.getUsername(),
//                    "email", savedCreator.getEmail()
//            ));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest()
//                    .body(Map.of("message", "Registration failed: " + e.getMessage()));
//        }
//    }
//
//    // ✅ Stripe onboarding endpoint
//    @GetMapping("/stripe/onboard/{creatorId}")
//    @ResponseBody
//    public ResponseEntity<?> initiateStripeOnboarding(@PathVariable Integer creatorId) {
//        try {
//            Creator creator = creatorRepo.findById(creatorId)
//                    .orElseThrow(() -> new RuntimeException("Creator not found"));
//
//            String onboardingUrl = stripeOnboardingService.createOnboardingLink(creator);
//
//            return ResponseEntity.ok(Map.of("url", onboardingUrl));
//        } catch (Exception e) {
//            return ResponseEntity.status(500)
//                    .body(Map.of("message", "Stripe onboarding failed: " + e.getMessage()));
//        }
//    }
//}