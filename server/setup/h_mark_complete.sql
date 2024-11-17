CREATE OR REPLACE FUNCTION mark_todo_completed(todo_id INTEGER)
RETURNS VOID
LANGUAGE plpgsql
AS
$$
BEGIN
    UPDATE todos
    SET completed = TRUE
    WHERE id = todo_id;
END;
$$;

ALTER FUNCTION mark_todo_completed(INTEGER) OWNER TO admin;
