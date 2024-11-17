-- Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Function to hash a password
CREATE OR REPLACE FUNCTION hash_password(password TEXT) RETURNS TEXT AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql;

-- Function to validate a password
CREATE OR REPLACE FUNCTION validate_password(password TEXT, hashed TEXT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN crypt(password, hashed) = hashed;
END;
$$ LANGUAGE plpgsql;
