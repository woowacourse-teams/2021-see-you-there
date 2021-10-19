package seeuthere.goodday.config.replication;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;
import org.springframework.transaction.support.TransactionSynchronizationManager;

public class RoutingDataSource extends AbstractRoutingDataSource {

    private final CircularList<String> dataSourceNames;

    public RoutingDataSource(CircularList<String> dataSourceNames) {
        this.dataSourceNames = dataSourceNames;
    }

    @Override
    protected Object determineCurrentLookupKey() {
        if (TransactionSynchronizationManager.isCurrentTransactionReadOnly()) {
            return dataSourceNames.getData();
        }
        return "master";
    }
}
