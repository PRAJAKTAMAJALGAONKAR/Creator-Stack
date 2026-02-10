package com.example.ems.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ems.entity.Creator;

public interface CreatorRepo extends JpaRepository<Creator, Integer> {

	Optional<Creator> findByEmail(String email);


    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
	Optional<Creator> findByUsernameAndPassword(
	        String username,
	        String password
	);
	Optional<Creator> findByStripeAccountId(String id);
	Optional<Creator> findByUsername(String username);

}

