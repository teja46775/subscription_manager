-- Step 1: Connect to PostgreSQL as superuser and create database
CREATE DATABASE subscription_manager;

-- Step 2: Connect to the subscription_manager database and create tables
\c subscription_manager;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create subscriptions table
CREATE TABLE subscriptions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    plan_name VARCHAR(100) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    price DECIMAL(10,2) NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data for testing
INSERT INTO users (email, password, phone) VALUES 
('test@test.com', '$2a$10$example.hash.here', '+1234567890'),
('admin@test.com', '$2a$10$example.hash.here', '+0987654321');

INSERT INTO subscriptions (user_id, plan_name, status, price, end_date) VALUES 
(1, 'Basic Plan', 'active', 9.99, NULL),
(1, 'Premium Plan', 'inactive', 19.99, '2024-12-31 23:59:59'),
(2, 'Enterprise Plan', 'active', 49.99, NULL);

-- Verify tables created
\dt

-- Check data
SELECT * FROM users;
SELECT * FROM subscriptions;