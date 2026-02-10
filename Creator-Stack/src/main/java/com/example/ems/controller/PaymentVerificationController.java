package com.example.ems.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.ems.entity.Content;
import com.example.ems.entity.ContentFile;
import com.example.ems.repo.ContentRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.model.checkout.Session;

@RestController
@RequestMapping("/api/payment")
public class PaymentVerificationController {

    private final ContentRepository contentRepository;

    public PaymentVerificationController(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    @GetMapping("/verify")
    public ResponseEntity<?> verify(@RequestParam String sessionId) {


        try {



            Session session = Session.retrieve(sessionId);


            if (!"payment".equals(session.getMode())) {
                return ResponseEntity.status(403).body("Invalid session mode");
            }


            if (!"paid".equals(session.getPaymentStatus())) {
                return ResponseEntity.status(403).body("Payment not completed");
            }


            String contentIdStr = session.getMetadata().get("contentId");
            if (contentIdStr == null) {
                return ResponseEntity.badRequest().body("Missing metadata");
            }

            Integer contentId = Integer.valueOf(contentIdStr);

            Content content = contentRepository.findById(contentId)
                    .orElseThrow(() -> new RuntimeException("Content not found"));


            if (!session.getAmountTotal()
                    .equals(Long.valueOf(content.getPrice()))) {
                return ResponseEntity.status(403).body("Amount mismatch");
            }


            PaymentIntent pi =
                    PaymentIntent.retrieve(session.getPaymentIntent());

            if (pi.getTransferData() == null ||
                !pi.getTransferData().getDestination()
                        .equals(content.getCreator().getStripeAccountId())) {

                return ResponseEntity.status(403)
                        .body("Transfer destination mismatch");
            }


            ContentFile file = content.getFiles().get(0);

            // extract filename safely
            String objectKey = file.getObjectKey();
            String fileName = objectKey.substring(objectKey.lastIndexOf("/") + 1);

            Map<String, String> response = new HashMap<>();
            response.put("bucket", file.getBucket());
            response.put("objectKey", objectKey);
            response.put("fileName", fileName);
            response.put("mimeType", file.getMimeType());

            return ResponseEntity.ok(response);

        } catch (StripeException e) {
            return ResponseEntity.status(500)
                    .body("Stripe verification failed");
        } catch (Exception e) {
            return ResponseEntity.status(500)
                    .body("Verification failed");
        }
    }
}
