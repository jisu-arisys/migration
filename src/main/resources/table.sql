    create table user_table (
        id bigserial not null,
        email_id character varying(255) ,
        first_name character varying(255) ,
        last_name character varying(255) ,
        primary key (id)
    );

    create table vdn_list (
        id bigserial not null,
        update_at varchar(255),
        vdn_name varchar(255),
        vdn_number varchar(255),
        primary key (id)
    );