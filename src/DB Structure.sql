-- Table for users (coaches and clients)
CREATE TABLE api.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL CHECK (role IN ('coach', 'client')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table for athletes (clients)
CREATE TABLE api.athletes (
    id SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES api.users(id) ON DELETE CASCADE,
    age INTEGER CHECK (age >= 0),
    fitness_goals VARCHAR(255),
    medical_conditions VARCHAR(255)
);

-- View to retrieve athlete details
CREATE VIEW api.athlete_details AS
SELECT
    u.id AS user_id,
    u.name,
    u.email,
    u.role,
    u.created_at,
    a.id AS athlete_id,
    a.age,
    a.fitness_goals,
    a.medical_conditions
FROM api.users u
JOIN api.athletes a ON u.id = a.user_id;

-- Table for workout sessions
CREATE TABLE api.workout_sessions (
    id SERIAL PRIMARY KEY,
    athlete_id INTEGER NOT NULL REFERENCES api.athletes(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    CONSTRAINT unique_athlete_workout_date UNIQUE (athlete_id, date)
);

-- Table for workout details (exercises in a session)
CREATE TABLE api.workout_details (
    id SERIAL PRIMARY KEY,
    workout_session_id INTEGER NOT NULL REFERENCES api.workout_sessions(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES api.exercises(id) ON DELETE CASCADE,
    instructions TEXT,
    exercise_name TEXT,
    -- Trigger to auto-set the exercise_name before insert/update
    CONSTRAINT fk_workout_session FOREIGN KEY (workout_session_id) REFERENCES api.workout_sessions(id) ON DELETE CASCADE
);

-- Trigger function to auto-fill exercise_name in workout details
CREATE OR REPLACE FUNCTION update_exercise_name()
RETURNS TRIGGER AS $$
BEGIN
    SELECT name INTO NEW.exercise_name FROM api.exercises WHERE id = NEW.exercise_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically set the exercise name in workout_details
CREATE TRIGGER set_exercise_name
BEFORE INSERT OR UPDATE ON api.workout_details
FOR EACH ROW EXECUTE FUNCTION update_exercise_name();

-- Table for workout sets (sets within an exercise)
CREATE TABLE api.workout_sets (
    id SERIAL PRIMARY KEY,
    workout_detail_id INTEGER NOT NULL REFERENCES api.workout_details(id) ON DELETE CASCADE,
    set_number INTEGER NOT NULL,
    reps INTEGER NOT NULL,
    weight NUMERIC(5, 2) NOT NULL,
    CONSTRAINT workout_detail_fk FOREIGN KEY (workout_detail_id) REFERENCES api.workout_details(id) ON DELETE CASCADE
);

-- Table for tracking athlete performance
CREATE TABLE api.exercise_performance (
    id SERIAL PRIMARY KEY,
    athlete_id INTEGER NOT NULL REFERENCES api.athletes(id) ON DELETE CASCADE,
    exercise_id INTEGER NOT NULL REFERENCES api.exercises(id) ON DELETE CASCADE,
    total_sessions INTEGER DEFAULT 0,   -- Total number of sessions with this exercise
    average_weight NUMERIC(10, 2) DEFAULT 0,  -- Average weight lifted across sessions
    average_reps NUMERIC(10, 2) DEFAULT 0,  -- Average reps performed across sessions
    personal_best_weight NUMERIC(10, 2),  -- Highest weight lifted for this exercise
    personal_best_reps INTEGER  -- Highest reps performed for this exercise
);

CREATE TABLE api.workout_trends (
    id SERIAL PRIMARY KEY,
    athlete_id INTEGER NOT NULL REFERENCES api.athletes(id) ON DELETE CASCADE,
    trend_type VARCHAR(50) NOT NULL CHECK (trend_type IN ('weekly', 'monthly')),  -- Weekly or monthly trend
    trend_period DATE NOT NULL,  -- Start date of the trend period
    total_weight NUMERIC(10, 2),  -- Total weight lifted in the period
    average_weight NUMERIC(10, 2),  -- Average weight lifted per session in the period
    average_reps NUMERIC(10, 2),  -- Average reps per session in the period
    total_workouts INTEGER,  -- Total number of workouts in the period
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
