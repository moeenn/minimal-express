-- Up Migration
create type user_role as enum('admin', 'user');

create table
  users (
    user_id uuid,
    email text unique not null,
    password text not null,
    role user_role not null default 'user',
    is_active boolean not null default true,
    created_at timestamp not null default now(),
    deleted_at timestamp null,
    primary key (user_id)
  )

-- Down Migration
drop table users;
drop type user_role;