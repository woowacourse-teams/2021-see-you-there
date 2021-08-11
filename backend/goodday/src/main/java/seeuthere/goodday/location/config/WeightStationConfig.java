package seeuthere.goodday.location.config;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Objects;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import seeuthere.goodday.exception.GoodDayException;
import seeuthere.goodday.location.domain.location.Point;
import seeuthere.goodday.location.domain.location.WeightStations;
import seeuthere.goodday.location.exception.LocationExceptionSet;

@Configuration
public class WeightStationConfig {

    @Bean
    public WeightStations weightStations() throws IOException {
        InputStream resourceAsStream = getClass().getClassLoader()
            .getResourceAsStream("data/weightedStations.txt");
        if (Objects.isNull(resourceAsStream)) {
            throw new GoodDayException(LocationExceptionSet.NOT_FOUND_WEIGHT_STATION_FILE);
        }
        BufferedReader input = new BufferedReader(new InputStreamReader(resourceAsStream));

        return getWeightStations(input);
    }

    private WeightStations getWeightStations(BufferedReader input) throws IOException {
        WeightStations weightstations = new WeightStations();
        String data = input.readLine();
        while (data != null) {
            String[] datas = data.split(",");
            String name = datas[0];
            double x = Double.parseDouble(datas[1]);
            double y = Double.parseDouble(datas[2]);
            Point point = new Point(x,y);
            weightstations.add(name, point);
            data = input.readLine();
        }
        return weightstations;
    }
}
