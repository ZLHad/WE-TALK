drop table if exists wetalk."relationship";
drop table if exists wetalk."message";
drop table if exists wetalk."user";

drop type if exists wetalk.message_type;
drop type if exists wetalk.relationship_status;

-- 用户表
create table wetalk."user"
(
    id         bigserial primary key,
    username   varchar   not null unique,
    password   varchar   not null,
    avatar     varchar,
    nickname   varchar,
    intro      varchar,
    created_at timestamp not null default now(),
    updated_at timestamp not null
);

-- 关系表
create type wetalk.relationship_status as enum (
    'None',
    'Friend',
    'Pending',
    'Black');

--
create table wetalk."relationship"
(
    id           bigserial primary key,
    from_user_id bigint                     not null references wetalk."user",
    to_user_id   bigint                     not null references wetalk."user",
    status       wetalk.relationship_status not null default 'None',
    created_at   timestamp                  not null default now(),
    updated_at   timestamp                  not null
);


-- 消息表
create type wetalk.message_type as enum ('PlanText');

create table wetalk."message"
(
    id           bigserial primary key,
    from_user_id bigint              not null references wetalk."user",
    to_user_id   bigint              not null references wetalk."user",
    type         wetalk.message_type not null default 'PlanText',
    content      varchar             not null,
    read         boolean             not null default false,
    created_at   timestamp           not null default now(),
    updated_at   timestamp           not null
);

