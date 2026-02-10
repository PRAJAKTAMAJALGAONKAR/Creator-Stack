package com.example.ems.service;
import org.springframework.stereotype.Service;

import com.example.ems.dto.CreatorWalletDTO;
import com.example.ems.entity.Creator;
import com.stripe.exception.StripeException;
import com.stripe.model.Balance;
import com.stripe.net.RequestOptions;

@Service
public class CreatorWalletService {

    public CreatorWalletDTO getWallet(Creator creator) {

        try {
            Balance balance = Balance.retrieve(
                    RequestOptions.builder()
                            .setStripeAccount(creator.getStripeAccountId())
                            .build()
            );

            long available =
                    balance.getAvailable().isEmpty() ? 0 :
                            balance.getAvailable().get(0).getAmount();

            long pending =
                    balance.getPending().isEmpty() ? 0 :
                            balance.getPending().get(0).getAmount();

            return new CreatorWalletDTO(available, pending);

        } catch (StripeException e) {
            throw new RuntimeException("Failed to fetch wallet balance", e);
        }
    }
}
