CREATE OR REPLACE FUNCTION get_todos_by_user(userId INT)
    RETURNS TABLE(id INT, title TEXT, completed BOOLEAN) AS $$
BEGIN
    RETURN QUERY SELECT t.id, t.title, t.completed FROM todos t WHERE user_id = userId ORDER BY t.id DESC;
END;
$$ LANGUAGE plpgsql;
