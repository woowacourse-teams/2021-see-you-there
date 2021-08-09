package seeuthere.goodday.location.config;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import seeuthere.goodday.location.domain.location.WeightStations;

@Configuration
public class WeightStationConfig {

    @Bean
    public WeightStations weightStations() throws IOException {
        WeightStations weightstations = new WeightStations();

        ClassPathResource resource = new ClassPathResource("data/weightedStations.txt");
        Path path = Paths.get(resource.getURI());
        List<String> dates = Files.readAllLines(path);

        for (String data : dates) {
            weightstations.add(data);
        }

        return weightstations;
    }
}
