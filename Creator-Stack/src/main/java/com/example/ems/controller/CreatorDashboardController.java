package com.example.ems.controller;

import com.example.ems.repo.CreatorRepo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ems.dto.CreatorDashboardDTO;
import com.example.ems.dto.CreatorWalletDTO;
import com.example.ems.entity.Creator;
import com.example.ems.service.CreatorDashboardService;
import com.example.ems.service.CreatorService;
import com.example.ems.service.CreatorWalletService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/creator")
public class CreatorDashboardController {

    private final CreatorService creatorService;
    private final CreatorDashboardService dashboardService;
    private final CreatorWalletService walletService;

    private final CreatorRepo creatorRepo;

    public CreatorDashboardController(
            CreatorService creatorService,
            CreatorDashboardService dashboardService,
            CreatorRepo creatorRepo,
            CreatorWalletService walletService) {
        this.creatorService = creatorService;
        this.dashboardService = dashboardService;
        this.walletService = walletService;
        this.creatorRepo=creatorRepo;
    }

    @GetMapping("/dashboard")
    public CreatorDashboardDTO dashboard(HttpSession session) {

        Creator creator = creatorService.getLoggedInCreator(session);
        return dashboardService.getDashboard(creator);
    }

    @GetMapping("/wallet")
    public CreatorWalletDTO wallet(@RequestParam Integer creatorId) {

        Creator creator = creatorRepo.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Creator not found"));

        return walletService.getWallet(creator);
    }

}
