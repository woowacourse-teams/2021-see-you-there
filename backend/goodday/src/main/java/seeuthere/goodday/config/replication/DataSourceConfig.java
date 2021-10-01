package seeuthere.goodday.config.replication;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

@Configuration
public class DataSourceConfig {

    private final DatabaseProperty databaseProperty;

    public DataSourceConfig(DatabaseProperty databaseProperty) {
        this.databaseProperty = databaseProperty;
    }

    private DataSource createDataSource(String url) {
        return DataSourceBuilder.create()
            .driverClassName(databaseProperty.getDriverClassName())
            .url(url)
            .username(databaseProperty.getUsername())
            .password(databaseProperty.getPassword())
            .build();
    }

    @Bean
    public DataSource routeDataSource() {
        Map<Object, Object> dataSources = new HashMap<>();

        DataSource master = createDataSource(databaseProperty.getMasterUrl());
        dataSources.put("master", master);

        List<Slave> slaves = databaseProperty.getSlaves();
        List<String> slaveNames = new ArrayList<>();
        for (Slave slave : slaves) {
            DataSource dataSource = createDataSource(slave.getUrl());
            slaveNames.add(slave.getName());
            dataSources.put(slave.getName(), dataSource);
        }

        RoutingDataSource routingDataSource = new RoutingDataSource(new CircularList<>(slaveNames));
        routingDataSource.setTargetDataSources(dataSources);
        routingDataSource.setDefaultTargetDataSource(master);

        return routingDataSource;
    }

    @Bean
    @Primary
    public LazyConnectionDataSourceProxy lazyConnectionDataSourceProxy() {
        return new LazyConnectionDataSourceProxy(routeDataSource());
    }
}
