package com.example.ems.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.example.ems.entity.Content;
import com.example.ems.entity.ContentFile;
import com.example.ems.entity.Creator;
import com.example.ems.entity.FileType;
import com.example.ems.repo.CreatorRepo;
import com.example.ems.service.ContentFileService;
import com.example.ems.service.ContentFileStorageService;
import com.example.ems.service.ContentService;
import com.example.ems.service.CreatorService;
import com.example.ems.service.StripeOnboardingService;

import jakarta.servlet.http.HttpSession;

@Controller
@RequestMapping("/creator")
public class CreatorViewController {

    private final ContentService contentService;
    private final ContentFileService contentFileService;
    private final CreatorService creatorService;
    private final ContentFileStorageService cos;
    public final StripeOnboardingService sos;
    public final CreatorRepo cro;

    public CreatorViewController(
            ContentService contentService,
            ContentFileService contentFileService,
            CreatorService creatorService,
            ContentFileStorageService cos,
            StripeOnboardingService sos,
            CreatorRepo cro
    ) {
        this.contentService = contentService;
        this.contentFileService = contentFileService;
        this.creatorService = creatorService;
        this.cos = cos;
        this.sos = sos;
        this.cro = cro;
    }


    @GetMapping("/register")
    public String showRegisterPage() {
        return "creator-register";   // JSP
    }


    @PostMapping("/register")
    public String registerCreator(Creator creator) {

        creatorService.registerCreator(creator);

        // after registration → dashboard (later login)
        return "redirect:/creator/dashboard";
    }


    @GetMapping("/dashboard")
    public String dashboard(Model model, HttpSession session) {

        Creator creator = (Creator) session.getAttribute("creator");

        if (creator == null) {
            return "redirect:/login";
        }

        List<Content> contents =
                contentService.getByCreatorId(creator.getId());

        model.addAttribute("contents", contents);


        return "creator-dashboard";
    }
    @PostMapping("/content")
    public String createContent(
        Content content,
        HttpSession session
    ) {
        Creator creator = (Creator) session.getAttribute("creator");
        content.setCreator(creator);

        Content saved = contentService.save(content);

        return "redirect:/creator/upload?contentId=" + saved.getId();
    }

    @GetMapping("/create")
    public String showCreateContentPage() {
        return "creator-content";
    }




    @GetMapping("/upload")
    public String uploadPage(
            @RequestParam Integer contentId,
            Model model
    ) {
        model.addAttribute("contentId", contentId);
        return "creator-upload";
    }
    @PostMapping("/upload")
    public String upload(
            @RequestParam Integer contentId,
            @RequestParam MultipartFile file,
            @RequestParam FileType fileType
    ) {
        Content content = contentService.getById(contentId);

        cos.upload(content, file, fileType);


        return "redirect:/creator/product?contentId=" + contentId;
    }


    @GetMapping("/product")
    public String viewProduct(
            @RequestParam Integer contentId,
            Model model
    ) {
        Content content = contentService.getById(contentId);
        List<ContentFile> files = contentFileService.getFilesByContentId(contentId);

        model.addAttribute("content", content);
        model.addAttribute("files", files);

        return "creator-product";
    }
    @GetMapping("/file/delete")
    public String deleteFile(
            @RequestParam Integer fileId,
            @RequestParam Integer contentId
    ) {
        cos.delete(fileId);

        return "redirect:/creator/product?contentId=" + contentId;
    }
    @GetMapping("/stripe/onboard")
    public String onboardCreator(HttpSession session) {
        Creator creator = (Creator) session.getAttribute("creator");

        String url = sos.createOnboardingLink(creator);
        cro.save(creator);

        return "redirect:" + url;
    }
    @GetMapping("/stripe/return")
    public String stripeReturn(HttpSession session) {
    	Creator creator = (Creator) session.getAttribute("creator");
    	if (creator == null) {
    	    return "redirect:/login";
    	}
    	Creator updatecreator =  cro.findById(creator.getId()).orElseThrow();
    	session.setAttribute("creator", updatecreator);
        return "redirect:/creator/dashboard";
    }
    @GetMapping("/stripe/refresh")
    public String stripeRefresh(HttpSession session) {

        Creator creator = (Creator) session.getAttribute("creator");

        String onboardingUrl =
            sos.createOnboardingLink(creator);

        return "redirect:" + onboardingUrl;
    }

}

