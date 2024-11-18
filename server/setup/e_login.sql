CREATE OR REPLACE FUNCTION login_user(emailAddr TEXT, password TEXT) RETURNS TEXT AS $$
DECLARE
    user_record RECORD;
     auth_token TEXT;
BEGIN
    SELECT * INTO user_record FROM users WHERE email = emailAddr;
    IF NOT FOUND THEN
        RETURN 'Invalid email or password';
    END IF;

    IF NOT validate_password(password, user_record.password) THEN
        RETURN 'Invalid email or password';
    END IF;

    auth_token := generate_auth_token(user_record.id);

    RETURN auth_token;
END;
$$ LANGUAGE plpgsql;
