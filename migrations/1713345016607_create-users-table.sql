 -- Up Migration
CREATE TYPE user_role AS ENUM('ADMIN', 'USER');

CREATE TABLE
  users (
    user_id UUID,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'ADMIN'::user_role,
    is_active BOOL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    deleted_at TIMESTAMP NULL,
    PRIMARY KEY (user_id)
  );

-- Down Migration
DROP
  TYPE user_role;

DROP TABLE
  users;