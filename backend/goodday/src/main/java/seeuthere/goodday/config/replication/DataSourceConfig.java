package seeuthere.goodday.config.replication;

import java.util.Map;
import javax.sql.DataSource;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.LazyConnectionDataSourceProxy;

@Configuration
public class DataSourceConfig {

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.master")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    @ConfigurationProperties(prefix = "spring.datasource.slave")
    public DataSource slaveDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean
    public DataSource routeDataSource() {
        RoutingDataSource routingDataSource = new RoutingDataSource();
        routingDataSource.setDefaultTargetDataSource(masterDataSource());
        Map<Object, Object> dataSources = Map.of(
            "master", masterDataSource(),
            "slave", slaveDataSource()
        );
        routingDataSource.setTargetDataSources(dataSources);
        return routingDataSource;
    }

    @Bean
    @Primary
    public LazyConnectionDataSourceProxy lazyConnectionDataSourceProxy() {
        return new LazyConnectionDataSourceProxy(routeDataSource());
    }
}
