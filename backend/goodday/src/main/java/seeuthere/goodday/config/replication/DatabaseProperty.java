package seeuthere.goodday.config.replication;

import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties("spring.datasource")
public class DatabaseProperty {

    private String masterUrl;
    private List<Slave> slaves;
    private String username;
    private String password;
    private String driverClassName;

    public String getMasterUrl() {
        return masterUrl;
    }

    public List<Slave> getSlaves() {
        return slaves;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getDriverClassName() {
        return driverClassName;
    }

    public void setMasterUrl(String masterUrl) {
        this.masterUrl = masterUrl;
    }

    public void setSlaves(List<Slave> slaves) {
        this.slaves = slaves;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setDriverClassName(String driverClassName) {
        this.driverClassName = driverClassName;
    }
}
