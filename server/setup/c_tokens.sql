CREATE OR REPLACE FUNCTION generate_auth_token(p_user_id INT) RETURNS TEXT AS $$
DECLARE
    v_token TEXT;
BEGIN
    v_token := gen_random_uuid()::TEXT;

    INSERT INTO auth_tokens (user_id, token, expires_at)
    VALUES (p_user_id, v_token, NOW() + INTERVAL '7 days');

    RETURN v_token;
END;
$$ LANGUAGE plpgsql;
