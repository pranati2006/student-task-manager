CREATE DATABASE IF NOT EXISTS student_task_manager
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE student_task_manager;


/* =========================================================
   USERS
   ========================================================= */

CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    UNIQUE KEY uk_users_email (email)
);


/* =========================================================
   TASKS
   ========================================================= */

CREATE TABLE tasks (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    user_id BIGINT UNSIGNED NOT NULL,

    title VARCHAR(200) NOT NULL,
    description TEXT NULL,

    priority ENUM(
        'LOW',
        'MEDIUM',
        'HIGH'
    ) NOT NULL DEFAULT 'MEDIUM',

    status ENUM(
        'PENDING',
        'COMPLETED'
    ) NOT NULL DEFAULT 'PENDING',

    due_date DATETIME NULL,
    completed_at DATETIME NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY (id),

    CONSTRAINT fk_tasks_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,

    KEY idx_tasks_user (user_id),
    KEY idx_tasks_user_status (user_id, status),
    KEY idx_tasks_user_priority (user_id, priority),
    KEY idx_tasks_user_due_date (user_id, due_date),
    KEY idx_tasks_created_at (created_at)
);