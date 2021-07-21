package seeuthere.goodday.docs;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/docs")
public class DocsController {

    @GetMapping("/{path}")
    public String index(@PathVariable String path) {
        return "/docs/" + path + ".html";
    }
}
