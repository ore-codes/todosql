CREATE OR REPLACE FUNCTION register_user(email TEXT, password TEXT) RETURNS TEXT AS $$
DECLARE
    hashed_password TEXT;
BEGIN
    -- Hash the password
    hashed_password := hash_password(password);

    -- Insert user into database
    INSERT INTO users (email, password) VALUES (email, hashed_password);

    RETURN 'User registered successfully';
EXCEPTION
    WHEN unique_violation THEN
        RETURN 'Email already exists';
END;
$$ LANGUAGE plpgsql;
