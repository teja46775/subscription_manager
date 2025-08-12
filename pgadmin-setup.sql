-- Step 1: First create the database (run this first)
CREATE DATABASE subscription_manager;

-- Step 2: After creating database, connect to 'subscription_manager' database in pgAdmin
-- Then run the rest of this code:

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

-- Insert test user (password is 'password123' hashed)
INSERT INTO users (email, password, phone) VALUES 
('test@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1234567890');

-- Insert sample subscriptions
INSERT INTO subscriptions (user_id, plan_name, status, price, end_date) VALUES 
(1, 'Basic Plan', 'active', 9.99, NULL),
(1, 'Premium Plan', 'inactive', 19.99, '2024-12-31 23:59:59'),
(1, 'Enterprise Plan', 'cancelled', 49.99, '2024-06-30 23:59:59');

-- Verify setup
SELECT 'Database setup complete!' as status;
SELECT * FROM users;
SELECT * FROM subscriptions;