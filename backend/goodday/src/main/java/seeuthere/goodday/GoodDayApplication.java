package seeuthere.goodday;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(exclude = DataSourceAutoConfiguration.class)
public class GoodDayApplication {

    public static void main(String[] args) {
        SpringApplication.run(GoodDayApplication.class, args);
    }
}
