package seeuthere.goodday.location.config;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import seeuthere.goodday.location.domain.location.WeightStations;

@Configuration
public class WeightStationConfig {

    @Bean
    public WeightStations weightStations() throws IOException {
        WeightStations weightstations = new WeightStations();

        InputStream resourceAsStream = getClass().getClassLoader()
            .getResourceAsStream("data/weightedStations.txt");
        BufferedReader input = new BufferedReader(new InputStreamReader(resourceAsStream));

        String data = input.readLine();
        while (data != null) {
            weightstations.add(data);
            data = input.readLine();
        }
        return weightstations;
    }
}
