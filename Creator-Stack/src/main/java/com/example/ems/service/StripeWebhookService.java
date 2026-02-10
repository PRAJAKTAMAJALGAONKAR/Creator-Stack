package com.example.ems.service;

import com.example.ems.entity.Creator;
import com.example.ems.entity.DownloadToken;
import com.example.ems.entity.OnboardingStatus;
import com.example.ems.entity.Payment;
import com.example.ems.repo.CreatorRepo;
import com.example.ems.repo.DownloadTokenRepository;
import com.example.ems.repo.PaymentRepository;
import com.stripe.model.Account;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class StripeWebhookService {

    private final CreatorRepo creatorRepo;
    private final PaymentRepository paymentRepo;
    private final DownloadTokenRepository downloadTokenRepo;

    public StripeWebhookService(
            CreatorRepo creatorRepo,
            PaymentRepository paymentRepo,
            DownloadTokenRepository downloadTokenRepo
    ) {
        this.creatorRepo = creatorRepo;
        this.paymentRepo = paymentRepo;
        this.downloadTokenRepo = downloadTokenRepo;
    }

    public void processEvent(Event event) {

        switch (event.getType()) {

            case "account.updated":
                handleAccountUpdated(event);
                break;

            case "checkout.session.completed":
                handleCheckoutSessionCompleted(event);
                break;

            default:

                break;
        }
    }

    private void handleAccountUpdated(Event event) {

        event.getDataObjectDeserializer()
             .getObject()
             .ifPresent(obj -> {

                 Account partial = (Account) obj;

                 try {
                     Account account = Account.retrieve(partial.getId());

                     creatorRepo.findByStripeAccountId(account.getId())
                         .ifPresent(creator -> {

                             boolean chargesEnabled = account.getChargesEnabled();
                             boolean payoutsEnabled = account.getPayoutsEnabled();

                             creator.setChargesEnabled(chargesEnabled);
                             creator.setPayoutsEnabled(payoutsEnabled);

                             if (chargesEnabled && payoutsEnabled) {
                                 creator.setOnboardingStatus(OnboardingStatus.COMPLETED);
                             } else {
                                 creator.setOnboardingStatus(OnboardingStatus.PENDING);
                             }

                             creatorRepo.save(creator);
                         });

                 } catch (Exception e) {

                 }
             });
    }


    private void handleCheckoutSessionCompleted(Event event) {

        Session session = (Session) event
                .getDataObjectDeserializer()
                .getObject()
                .orElseThrow();

        String sessionId = session.getId();

        Optional<Payment> paymentOpt =
                paymentRepo.findByStripeSessionId(sessionId);

        if (paymentOpt.isEmpty()) {
            return;
        }

        Payment payment = paymentOpt.get();

        if (payment.isPaid()) {
            return;
        }

        payment.setPaid(true);
        payment.setPaidAt(LocalDateTime.now());
        paymentRepo.save(payment);

        // Generate download token
        DownloadToken token = new DownloadToken();
        token.setContent(payment.getSellLink().getContent());
        token.setToken(UUID.randomUUID().toString());
        token.setActive(true);

        downloadTokenRepo.save(token);
    }
}
