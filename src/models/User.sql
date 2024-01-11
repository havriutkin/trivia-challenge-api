CREATE TABLE "user" (
    id SERIAL PRIMARY KEY,
    username varchar NOT NULL UNIQUE,
    password varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    join_date Date NOT NULL,
    image_url varchar
);

-- User registration
CREATE OR REPLACE FUNCTION register_user(
    _username VARCHAR,
    _password VARCHAR,
    _email VARCHAR,
    _image_url VARCHAR DEFAULT NULL
)
RETURNS INTEGER
LANGUAGE plpgsql
AS $$
DECLARE
    new_user_id INTEGER;
BEGIN
    -- Insert the new user data into the user table
    INSERT INTO "user" (username, password, email, join_date, image_url)
    VALUES (_username, _password, _email, CURRENT_DATE, _image_url)
    RETURNING id INTO new_user_id;  -- Capture the id of the new user

    RETURN new_user_id;

    EXCEPTION
        WHEN unique_violation THEN 
            RAISE EXCEPTION 'Username or email already exists.';
END;
$$;
