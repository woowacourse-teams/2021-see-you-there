package seeuthere.goodday.docs.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/docs")
public class DocsController {

    @GetMapping
    public String docs() {
        return "docs/index.html";
    }
}
