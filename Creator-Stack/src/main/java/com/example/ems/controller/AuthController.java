package com.example.ems.controller;

import com.example.ems.entity.Creator;
import com.example.ems.service.CreatorService;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class AuthController {

    private final CreatorService creatorService;

    public AuthController(CreatorService creatorService) {
        this.creatorService = creatorService;
    }


    @GetMapping("/login")
    public String showLoginPage() {
        return "login";   // login.jsp
    }


    @PostMapping("/login")
    public String login(
            @RequestParam String username,
            @RequestParam String password,
            HttpSession session,
            Model model
    ) {

        Creator creator =
                creatorService.authenticate(username, password);

        if (creator == null) {
            model.addAttribute("error", "Invalid credentials");
            return "login";
        }


        session.setAttribute("creator", creator);

        return "redirect:/creator/dashboard";
    }


    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}
