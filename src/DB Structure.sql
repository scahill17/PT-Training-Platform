/* ------------------------------- HEADER -------------------------------- */
/* This file only exists to view the framework of the database thorugh SQL */

CREATE TABLE api.users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('coach', 'client')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE api.athletes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES api.users(id) ON DELETE CASCADE,
    age INT CHECK (age >= 0),
    fitness_goals VARCHAR(255),
    medical_conditions VARCHAR(255),
    UNIQUE (user_id)
);

CREATE TABLE api.workout_sessions (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES api.clients(id) ON DELETE CASCADE,
    session_date DATE NOT NULL,
    total_weight_lifted INT DEFAULT 0,
    readiness_score INT CHECK (readiness_score >= 0 AND readiness_score <= 10),
    session_duration INT NOT NULL, -- Duration in minutes
    intensity INT CHECK (intensity >= 1 AND intensity <= 10)
);

CREATE TABLE api.exercises (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    media_url VARCHAR(255)
);

CREATE TABLE api.workout_details (
    id SERIAL PRIMARY KEY,
    workout_session_id INT REFERENCES api.workout_sessions(id) ON DELETE CASCADE,
    exercise_id INT REFERENCES api.exercises(id) ON DELETE CASCADE,
    sets INT NOT NULL CHECK (sets >= 1),
    reps INT NOT NULL CHECK (reps >= 1),
    weight INT NOT NULL CHECK (weight >= 0)
);

CREATE TABLE api.client_analytics (
    id SERIAL PRIMARY KEY,
    client_id INT REFERENCES api.clients(id) ON DELETE CASCADE,
    analytics_date DATE NOT NULL,
    readiness_score INT CHECK (readiness_score >= 0 AND readiness_score <= 10),
    volume_lifted INT CHECK (volume_lifted >= 0)
);


-- Base Insertions
INSERT INTO api.users (name, email, role)
VALUES 
('John Coach', 'john.coach@example.com', 'coach'),
('Emily Coach', 'emily.coach@example.com', 'coach'),
('Mark Client', 'mark.client@example.com', 'client'),
('Lucy Client', 'lucy.client@example.com', 'client');

INSERT INTO api.clients (user_id, age, fitness_goals, medical_conditions)
VALUES 
(3, 30, 'Build muscle', 'None'),
(4, 28, 'Lose weight', 'Asthma');

INSERT INTO api.exercises (name, media_url)
VALUES 
('Squat', 'http://example.com/squat-video'),
('Bench Press', 'http://example.com/benchpress-video'),
('Deadlift', 'http://example.com/deadlift-video');

INSERT INTO api.workout_sessions (client_id, session_date, total_weight_lifted, readiness_score, session_duration, intensity)
VALUES 
(1, '2024-09-01', 500, 8, 60, 7),  -- Mark's session
(2, '2024-09-02', 300, 7, 45, 6);  -- Lucy's session

INSERT INTO api.workout_details (workout_session_id, exercise_id, sets, reps, weight)
VALUES 
(1, 1, 3, 10, 100),  -- Mark's session includes squats
(1, 2, 3, 8, 80),    -- Mark also did bench presses
(2, 2, 3, 12, 60),   -- Lucy's session includes bench presses
(2, 3, 4, 6, 120);   -- Lucy did deadlifts

INSERT INTO api.client_analytics (client_id, analytics_date, readiness_score, volume_lifted)
VALUES 
(1, '2024-09-01', 8, 500),  -- Mark's readiness and total weight lifted
(2, '2024-09-02', 7, 300);  -- Lucy's readiness and total weight lifted