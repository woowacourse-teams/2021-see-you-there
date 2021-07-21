package seeuthere.goodday.docs;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/docs")
public class DocsController {

    @GetMapping("/index")
    public String index() {
        return "/docs/index.html";
    }
}
