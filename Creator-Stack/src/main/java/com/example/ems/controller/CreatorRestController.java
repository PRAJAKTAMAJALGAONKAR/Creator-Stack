package com.example.ems.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ems.entity.Creator;
import com.example.ems.repo.CreatorRepo;
import com.example.ems.service.CreatorService;
import com.example.ems.service.StripeOnboardingService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/creator")
@CrossOrigin(origins = "http://localhost:5173")
public class CreatorRestController {

    private final CreatorService creatorService;
    private final StripeOnboardingService stripeOnboardingService;
    private final CreatorRepo creatorRepo;

    public CreatorRestController(
            CreatorService creatorService,
            StripeOnboardingService stripeOnboardingService,
            CreatorRepo creatorRepo) {
        this.creatorService = creatorService;
        this.stripeOnboardingService = stripeOnboardingService;
        this.creatorRepo = creatorRepo;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerCreator(@RequestBody Creator creator) {
        try {
            System.out.println("Registering creator: " + creator.getUsername());

            Creator savedCreator = creatorService.registerCreator(creator);

            System.out.println("Creator saved with ID: " + savedCreator.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("id", savedCreator.getId());
            response.put("username", savedCreator.getUsername());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Registration error: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> error = new HashMap<>();
            error.put("message", "Registration failed: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginCreator(@RequestBody Map<String, String> loginRequest) {
        try {
            String username = loginRequest.get("username");
            String password = loginRequest.get("password");

            System.out.println("Login attempt for username: " + username);


            Optional<Creator> creatorOpt = creatorRepo.findByUsername(username);

            if (creatorOpt.isEmpty()) {
                System.out.println(" Creator not found with username: " + username);
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            Creator creator = creatorOpt.get();

            // Check password
            if (!creator.getPassword().equals(password)) {
                System.out.println("Invalid password for: " + username);
                Map<String, String> error = new HashMap<>();
                error.put("message", "Invalid username or password");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
            }

            System.out.println("✅ Login successful for: " + username);

            // Return creator details
            Map<String, Object> response = new HashMap<>();
            response.put("id", creator.getId());
            response.put("username", creator.getUsername());
            response.put("stripeAccountId", creator.getStripeAccountId());
            response.put("chargesEnabled", creator.isChargesEnabled());
            response.put("payoutsEnabled", creator.isPayoutsEnabled());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Login error: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> error = new HashMap<>();
            error.put("message", "Login failed: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @GetMapping("/stripe/onboard/{creatorId}")
    public ResponseEntity<?> initiateStripeOnboarding(@PathVariable Integer creatorId) {
        try {
            System.out.println("Initiating Stripe onboarding for creator ID: " + creatorId);

            Creator creator = creatorRepo.findById(creatorId)
                    .orElseThrow(() -> new RuntimeException("Creator not found with ID: " + creatorId));

            System.out.println("Found creator: " + creator.getUsername());

            String onboardingUrl = stripeOnboardingService.createOnboardingLink(creator);

            Map<String, String> response = new HashMap<>();
            response.put("url", onboardingUrl);

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println("Stripe onboarding error: " + e.getMessage());
            e.printStackTrace();

            Map<String, String> error = new HashMap<>();
            error.put("message", "Stripe onboarding failed: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }
}