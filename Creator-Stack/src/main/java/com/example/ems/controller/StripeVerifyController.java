package com.example.ems.controller;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.ems.entity.Payment;
import com.example.ems.entity.SellLink;
import com.example.ems.repo.PaymentRepository;
import com.example.ems.repo.SellLinkRepository;
import com.stripe.model.checkout.Session;
@RestController
@RequestMapping("/api/stripe")
public class StripeVerifyController {

    @Autowired
    private PaymentRepository paymentRepo;

    @Autowired
    private SellLinkRepository sellLinkRepo;

    @GetMapping("/verify")
    public Map<String, Object> verifyPayment(
            @RequestParam String session_id
    ) throws Exception {

        Session session = Session.retrieve(session_id);
        System.out.println("VERIFY API HIT: " + session_id);


        if (!"paid".equals(session.getPaymentStatus())) {
            throw new RuntimeException("Payment not completed");
        }

        Long contentId = Long.valueOf(session.getMetadata().get("contentId"));


        SellLink sellLink = sellLinkRepo
                .findByContent_Id(contentId.intValue())
                .orElseThrow(() -> new RuntimeException("Sell link not found"));


        if (paymentRepo.existsByStripeSessionId(session_id)) {
            return Map.of("status", "already_saved");
        }

        Payment payment = new Payment();


        payment.setSellLink(sellLink);
        payment.setContent(sellLink.getContent());
        payment.setCreator(sellLink.getCreator());

        payment.setStripeSessionId(session_id);
        payment.setAmount(
                BigDecimal.valueOf(session.getAmountTotal()).divide(BigDecimal.valueOf(100))
        );
        payment.setPaid(true);
        payment.setSuccessful(true);
        payment.setPaidAt(LocalDateTime.now());

        paymentRepo.save(payment);

        return Map.of(
                "status", "success",
                "paymentId", payment.getId()
        );
    }
}
