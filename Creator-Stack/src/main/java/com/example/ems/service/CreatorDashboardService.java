package com.example.ems.service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.ems.dto.CreatorDashboardDTO;
import com.example.ems.entity.Creator;
import com.example.ems.repo.PaymentRepository;

@Service
public class CreatorDashboardService {

    private final PaymentRepository paymentRepo;

    public CreatorDashboardService(PaymentRepository paymentRepo) {
        this.paymentRepo = paymentRepo;
    }

    public CreatorDashboardDTO getDashboard(Creator creator) {

        long totalBuyers =
                paymentRepo.countByCreatorAndSuccessfulTrue(creator);


        BigDecimal totalEarnings =
                paymentRepo.sumEarningsByCreator(creator);

        Map<String, Long> salesPerContent = new HashMap<>();

        for (Object[] row : paymentRepo.contentSalesBreakdown(creator)) {
            salesPerContent.put(
                    (String) row[0],
                    (Long) row[1]
            );
        }

        return new CreatorDashboardDTO(
                totalBuyers,
                totalEarnings,
                salesPerContent
        );
    }
}