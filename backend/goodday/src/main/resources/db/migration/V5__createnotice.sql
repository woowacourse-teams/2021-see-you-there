CREATE TABLE `notice` (
                          id bigint(20)  NOT NULL,
                          title varchar(255) NOT NULL,
                          content text NOT NULL,
                          create_time datetime(6),
                          update_time datetime(6),
                          active bool,
                          PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;