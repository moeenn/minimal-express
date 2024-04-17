-- Up Migration
CREATE PROCEDURE user_create (
  user_id UUID,
  email TEXT,
  password TEXT,
  role user_role
) as $$
INSERT INTO
  users (user_id, email, password, role)
VALUES
  (user_id, email, password, role);
$$ LANGUAGE SQL;

CREATE PROCEDURE user_update (
  id UUID,
  email TEXT,
  password TEXT,
  role user_role,
  is_active BOOL
) AS $$
UPDATE
  users
SET
  email = email,
  password = password,
  role = role,
  is_active = is_active
WHERE
  user_id = id;
$$ LANGUAGE SQL;

CREATE PROCEDURE user_delete (id UUID) AS $$
UPDATE
  users
SET
  deleted_at = NOW()
WHERE
  user_id = id;
$$ LANGUAGE SQL;

CREATE FUNCTION user_find_by_id (id UUID) RETURNS users AS $$
SELECT * FROM users
WHERE
  user_id = id
  AND deleted_at IS NULL
LIMIT 1;
$$ LANGUAGE SQL;

CREATE FUNCTION user_list () RETURNS users AS $$
SELECT * FROM users
WHERE
  deleted_at is NULL;
$$ LANGUAGE SQL;

-- Down Migration
DROP PROCEDURE user_create (
  user_id UUID,
  email TEXT,
  password TEXT,
  role user_role
);

DROP PROCEDURE user_update (
  id UUID,
  email TEXT,
  password TEXT,
  role user_role,
  is_active BOOL
);

DROP PROCEDURE user_delete (id UUID);

DROP FUNCTION user_find_by_id (id UUID);

DROP FUNCTION user_list ();