package com.example.ems.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.ems.entity.Content;
import com.example.ems.entity.Creator;
import com.example.ems.entity.SellLink;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

@Service
public class StripePaymentService {

    public String createCheckoutSession(SellLink link) {

        Content content = link.getContent();
        Creator creator = content.getCreator();

        try {

            SessionCreateParams params =
                    SessionCreateParams.builder()
                            .setMode(SessionCreateParams.Mode.PAYMENT)

                            //  Redirect to .NET service
                            .setSuccessUrl(
                                "http://localhost:5173/download/?session_id={CHECKOUT_SESSION_ID}"
                            )
                            .setCancelUrl(
                                "http://localhost:5173/download/cancel"
                            )


                            .addLineItem(
                                    SessionCreateParams.LineItem.builder()
                                            .setQuantity(1L)
                                            .setPriceData(
                                                    SessionCreateParams.LineItem.PriceData.builder()
                                                            .setCurrency("sgd") // use SG since platform is SG
                                                            .setUnitAmount(Long.valueOf(content.getPrice()))
                                                            .setProductData(
                                                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                            .setName(content.getPrompt())
                                                                            .build()
                                                            )
                                                            .build()
                                            )
                                            .build()
                            )

                            //  attach metadata
                            .putMetadata("contentId", content.getId().toString())


                            .setPaymentIntentData(
                                    SessionCreateParams.PaymentIntentData.builder()
                                            .setTransferData(
                                                    SessionCreateParams.PaymentIntentData.TransferData.builder()
                                                            .setDestination(creator.getStripeAccountId())
                                                            .build()
                                            )
                                            .build()
                            )

                            .build();

            Session session = Session.create(params);

            return session.getUrl();

        } catch (StripeException e) {
            throw new RuntimeException("Stripe checkout failed", e);
        }
    }
}
