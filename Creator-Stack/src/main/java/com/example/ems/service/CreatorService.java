package com.example.ems.service;

import org.springframework.stereotype.Service;


import com.example.ems.entity.Creator;
import com.example.ems.repo.CreatorRepo;
import jakarta.servlet.http.HttpSession;
@Service
public class CreatorService {

    private final CreatorRepo creatorRepo;


    public CreatorService(CreatorRepo creatorRepo) {
        this.creatorRepo = creatorRepo;
    }



    public Creator registerCreator(Creator creator) {

        if (creator.getUsername() == null || creator.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }

        if (creatorRepo.existsByUsername(creator.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        if (creatorRepo.existsByEmail(creator.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        return creatorRepo.save(creator); // ID generated here
    }



    public Creator getCreator(Integer cust_id) {
        return creatorRepo.findById(cust_id)
                .orElseThrow(() -> new RuntimeException("Creator not found"));
    }

    public Creator getCreator(String username) {
        return creatorRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Creator not found"));
    }



    public Creator save(Creator creator) {
        return creatorRepo.save(creator);
    }
    public Creator authenticate(String username, String password) {
        return creatorRepo
                .findByUsernameAndPassword(username, password)
                .orElse(null);
    }



    public Creator getByUsername(String username) {

        return creatorRepo
                .findByUsername(username)
                .orElse(null);
    }

    public Creator getById(Integer id) {

        return creatorRepo
                .findById(id)
                .orElse(null);
    }
    
    public Creator getLoggedInCreator(HttpSession session) {

        Object obj = session.getAttribute("creator");

        if (obj == null) {
            throw new RuntimeException("Creator not logged in");
        }

        return (Creator) obj;
    }

}

