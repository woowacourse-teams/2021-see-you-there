package seeuthere.goodday.config.replication;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("spring.datasource")
public class DatabaseProperty {

    private String masterUrl;
    private List<?> salveList;
    private String username;
    private String password;
}
