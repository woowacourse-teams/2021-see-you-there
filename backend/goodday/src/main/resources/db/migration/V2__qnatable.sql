CREATE TABLE admin (
                       id bigint NOT NULL auto_increment,
                       member_id varchar(255),
                       primary key (id)
) engine=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE board (
                       id bigint NOT NULL auto_increment,
                       content varchar(255),
                       create_time datetime(6),
                       label varchar(255),
                       title varchar(255),
                       update_time datetime(6),
                       member_id varchar(255),
                       primary key (id)
) engine=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE comment (
                         id bigint NOT NULL auto_increment,
                         content varchar(255),
                         create_time datetime(6),
                         update_time datetime(6),
                         admin_id bigint,
                         board_id bigint,
                         primary key (id)
) engine=InnoDB DEFAULT CHARSET=utf8;

alter table admin
    add constraint FKqe770yjl5gjfgesmdn6xj44sn
        foreign key (member_id)
            references member (member_id);

alter table board
    add constraint FKsds8ox89wwf6aihinar49rmfy
        foreign key (member_id)
            references member (member_id);

alter table comment
    add constraint FKa0uvlibufwl49sxwl5dwvm76l
        foreign key (admin_id)
            references admin (id);

alter table comment
    add constraint FKlij9oor1nav89jeat35s6kbp1
        foreign key (board_id)
            references board (id);