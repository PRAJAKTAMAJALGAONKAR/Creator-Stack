//package com.example.ems.controller;
//
//import java.util.List;
//
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//
//import com.example.ems.entity.Content;
//import com.example.ems.entity.Creator;
//import com.example.ems.repo.ContentRepository;
//
//import jakarta.servlet.http.HttpSession;
//
//@Controller
//@RequestMapping("/creator")
//public class CreatorSellController {
//
//    private final ContentRepository contentRepo;
//
//    public CreatorSellController(ContentRepository contentRepo) {
//        this.contentRepo = contentRepo;
//    }
//
//    @GetMapping("/sell")
//    public String sellPage(HttpSession session, Model model) {
//
//        Creator creator = (Creator) session.getAttribute("creator");
//        if (creator == null) {
//            return "redirect:/login";
//        }
//
//        List<Content> contents = contentRepo.findByCreatorId(creator.getId());
//        model.addAttribute("contents", contents);
//
//        return "creator-sell"; // sell.jsp
//    }
//}
