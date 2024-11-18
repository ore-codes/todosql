CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_password(password TEXT) RETURNS TEXT AS $$
BEGIN
    RETURN crypt(password, gen_salt('bf'));
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION validate_password(password TEXT, hashed TEXT) RETURNS BOOLEAN AS $$
BEGIN
    RETURN crypt(password, hashed) = hashed;
END;
$$ LANGUAGE plpgsql;
