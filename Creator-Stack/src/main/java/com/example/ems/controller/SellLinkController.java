package com.example.ems.controller;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import com.example.ems.entity.Content;
import com.example.ems.entity.Creator;
import com.example.ems.entity.SellLink;
import com.example.ems.repo.CreatorRepo;
import com.example.ems.service.ContentService;
import com.example.ems.service.SellLinkService;
import com.example.ems.service.StripeOnboardingService;

import java.util.Map;

@RestController
@RequestMapping("/api/sell-links")
public class SellLinkController {

    private final SellLinkService sellLinkService;
    private final ContentService contentService;
    private final CreatorRepo creatorRepo;

    public SellLinkController(
            SellLinkService sellLinkService,
            ContentService contentService,
            CreatorRepo creatorRepo) {
        this.sellLinkService = sellLinkService;
        this.contentService = contentService;
        this.creatorRepo = creatorRepo;
    }

    @PostMapping
    public ResponseEntity<?> createSellLink(
            @RequestParam Integer contentId,
            @RequestParam Integer creatorId) {

        Creator creator =
                creatorRepo.findById(creatorId).orElseThrow();

        Content content =
                contentService.getById(contentId);

        SellLink sellLink =
                sellLinkService.createSellLink(contentId, creator);

        String url =
                "http://localhost:5173/buy/"
                        + sellLink.getSlug()
                        + "?token="
                        + sellLink.getToken();

        return ResponseEntity.ok(
                Map.of(
                        "url", url,
                        "chargesEnabled", creator.isChargesEnabled()
                )
        );
    }
}
