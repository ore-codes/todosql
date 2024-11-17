CREATE OR REPLACE FUNCTION generate_auth_token(p_user_id INT) RETURNS TEXT AS $$
DECLARE
    v_token TEXT;
BEGIN
    -- Generate a random token
    v_token := gen_random_uuid()::TEXT;

    -- Insert the token into the auth_tokens table
    INSERT INTO auth_tokens (user_id, token, expires_at)
    VALUES (p_user_id, v_token, NOW() + INTERVAL '7 days');

    -- Return the token
    RETURN v_token;
END;
$$ LANGUAGE plpgsql;
