CREATE OR REPLACE FUNCTION register_user(email TEXT, password TEXT) RETURNS TEXT AS $$
DECLARE
    hashed_password TEXT;
BEGIN
    hashed_password := hash_password(password);

    INSERT INTO users (email, password) VALUES (email, hashed_password);

    RETURN 'User registered successfully';
EXCEPTION
    WHEN unique_violation THEN
        RETURN 'Email already exists';
END;
$$ LANGUAGE plpgsql;
