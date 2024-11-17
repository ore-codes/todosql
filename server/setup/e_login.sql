CREATE OR REPLACE FUNCTION login_user(emailAddr TEXT, password TEXT) RETURNS TEXT AS $$
DECLARE
    user_record RECORD;
     auth_token TEXT;
BEGIN
    -- Check if the user exists
    SELECT * INTO user_record FROM users WHERE email = emailAddr;
    IF NOT FOUND THEN
        RETURN 'Invalid email or password';
    END IF;

    -- Validate the password
    IF NOT validate_password(password, user_record.password) THEN
        RETURN 'Invalid email or password';
    END IF;

    -- Generate an authentication token for the user
    auth_token := generate_auth_token(user_record.id);

    -- Return the generated token
    RETURN auth_token;
END;
$$ LANGUAGE plpgsql;
