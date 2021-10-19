create sequence hibernate_sequence start with 1 increment by 1;

CREATE TABLE `member` (
                          `member_id` varchar(255) NOT NULL,
                          `member_search_id` varchar(255) NOT NULL,
                          `nickname` varchar(255) NOT NULL,
                          `profile_image` varchar(255) DEFAULT NULL,
                          PRIMARY KEY (`member_id`),
                          UNIQUE KEY `UK_oy78jhprgh34d2bwdmfftuvrv` (`member_search_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `address` (
                           `address_id` bigint(20) NOT NULL,
                           `address_name` varchar(255) DEFAULT NULL,
                           `full_address` varchar(255) DEFAULT NULL,
                           `nickname` varchar(255) DEFAULT NULL,
                           `x` double DEFAULT NULL,
                           `y` double DEFAULT NULL,
                           `member_id` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`address_id`),
                           KEY `FKcnw0s8hudme00qu71e3mqd5ih` (`member_id`),
                           CONSTRAINT `FKcnw0s8hudme00qu71e3mqd5ih` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `friend_ship` (
                               `friend_member_id` varchar(255) NOT NULL,
                               `owner_member_id` varchar(255) NOT NULL,
                               PRIMARY KEY (`friend_member_id`,`owner_member_id`),
                               KEY `FK46bb502k53pwqt8ktud50ebc2` (`owner_member_id`),
                               CONSTRAINT `FK2ka6hiq2utok4vaedie1bjs0a` FOREIGN KEY (`friend_member_id`) REFERENCES `member` (`member_id`),
                               CONSTRAINT `FK46bb502k53pwqt8ktud50ebc2` FOREIGN KEY (`owner_member_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `request_friend` (
                                  `id` bigint(20) NOT NULL,
                                  `receiver_id` varchar(255) DEFAULT NULL,
                                  `requester_id` varchar(255) DEFAULT NULL,
                                  PRIMARY KEY (`id`),
                                  KEY `FKe4wpf34ktqky2h177ps55ye75` (`receiver_id`),
                                  KEY `FKerphlw4he37imviqg9gox9upq` (`requester_id`),
                                  CONSTRAINT `FKe4wpf34ktqky2h177ps55ye75` FOREIGN KEY (`receiver_id`) REFERENCES `member` (`member_id`),
                                  CONSTRAINT `FKerphlw4he37imviqg9gox9upq` FOREIGN KEY (`requester_id`) REFERENCES `member` (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
