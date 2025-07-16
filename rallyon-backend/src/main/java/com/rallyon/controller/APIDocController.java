package com.rallyon.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class APIDocController {

    @GetMapping("/")
    public String welcomePage(){
        return "forward:/welcome.html";
    }
}
