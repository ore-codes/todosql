DROP FUNCTION create_todo(integer,text);

CREATE OR REPLACE FUNCTION create_todo(user_id INTEGER, title TEXT)
RETURNS JSON
LANGUAGE plpgsql
AS
$$
DECLARE
    inserted_record JSON;
BEGIN
    INSERT INTO todos (user_id, title)
    VALUES (user_id, title)
    RETURNING row_to_json(todos) INTO inserted_record;

    RETURN inserted_record;
END;
$$;
