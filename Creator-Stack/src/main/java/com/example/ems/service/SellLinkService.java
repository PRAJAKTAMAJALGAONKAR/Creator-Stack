package com.example.ems.service;

import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.ems.entity.Content;
import com.example.ems.entity.Creator;
import com.example.ems.entity.SellLink;
import com.example.ems.repo.ContentRepository;
import com.example.ems.repo.SellLinkRepository;

@Service
@Transactional
public class SellLinkService {

    private final SellLinkRepository sellLinkRepo;
    private final ContentRepository contentRepo;

    public SellLinkService(
            SellLinkRepository sellLinkRepo,
            ContentRepository contentRepo
    ) {
        this.sellLinkRepo = sellLinkRepo;
        this.contentRepo = contentRepo;
    }

    public SellLink createSellLink(Integer contentId, Creator creator) {

        Content content = contentRepo.findById(contentId)
                .orElseThrow(() -> new RuntimeException("Content not found"));


        if (!content.getCreator().getId().equals(creator.getId())) {
            throw new RuntimeException("Unauthorized");
        }


        if (creator.getStripeAccountId() == null ||
            !creator.isChargesEnabled()) {

            throw new IllegalStateException("CREATOR_NOT_ONBOARDED");
        }


        return sellLinkRepo.findByContent_Id(contentId)
                .orElseGet(() -> {
                    SellLink link = new SellLink();
                    link.setContent(content);
                    link.setCreator(content.getCreator());
                    link.setSlug(toSlug(content.getPrompt()));
                    link.setToken(UUID.randomUUID().toString().replace("-", ""));
                    return sellLinkRepo.save(link);
                });
    }

    private String toSlug(String input) {
        return input.toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}
