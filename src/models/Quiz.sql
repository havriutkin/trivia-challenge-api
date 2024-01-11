CREATE TABLE quiz(
    id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES "user" (id),
    difficulty varchar NOT NULL,
    questions_total integer NOT NULL,
    right_answers integer NOT NULL,
    topic varchar NOT NULL
);

-- Adding Quiz
CREATE OR REPLACE PROCEDURE add_quiz_info(
    _user_id integer,
    _difficulty varchar, 
    _questions_total integer,
    _right_answers integer,
    _topic varchar
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- Insert the new quiz data into the quiz table
    INSERT INTO "quiz" (user_id, difficulty, questions_total, right_answers, topic)
    VALUES (_user_id, _difficulty, _questions_total, _right_answers, _topic);

    EXCEPTION
        WHEN null_value_not_allowed THEN 
            RAISE EXCEPTION 'Username or email already exists.';
END;
$$;

