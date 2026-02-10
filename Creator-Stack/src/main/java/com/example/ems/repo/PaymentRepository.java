package com.example.ems.repo;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.ems.entity.Creator;
import com.example.ems.entity.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    Optional<Payment> findByStripeSessionId(String sessionId);
    boolean existsByStripeSessionId(String stripeSessionId);

    long countByCreatorAndSuccessfulTrue(Creator creator);

    @Query("SELECT COALESCE(SUM(p.amount), 0) FROM Payment p WHERE p.creator = :creator AND p.successful = true")
    BigDecimal sumEarningsByCreator(@Param("creator") Creator creator);

    @Query("""
        SELECT p.content.prompt, COUNT(p)
        FROM Payment p
        WHERE p.creator = :creator AND p.successful = true
        GROUP BY p.content.prompt
    """)
    List<Object[]> contentSalesBreakdown(@Param("creator") Creator creator);
}