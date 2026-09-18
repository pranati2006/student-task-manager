USE student_task_manager;

INSERT INTO users (
    name,
    email,
    password_hash
)
VALUES (
    'Test Student',
    'student@test.com',
    'temporary-hash-for-testing-only'
);

INSERT INTO tasks (
    user_id,
    title,
    description,
    priority,
    status,
    due_date
)
VALUES
(
    1,
    'Complete React Assignment',
    'Finish task manager frontend.',
    'HIGH',
    'PENDING',
    '2026-09-25 23:59:59'
),
(
    1,
    'Study Database Concepts',
    'Review primary keys and foreign keys.',
    'MEDIUM',
    'PENDING',
    '2026-09-22 18:00:00'
),
(
    1,
    'Read Research Paper',
    'Read the assigned research paper.',
    'LOW',
    'COMPLETED',
    '2026-09-17 20:00:00'
);