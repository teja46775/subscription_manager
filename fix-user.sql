-- Connect to subscription_manager database and run this:

-- Check if user exists
SELECT * FROM users WHERE email = 'test@test.com';

-- If no user found, create one with hashed password for 'password123'
INSERT INTO users (email, password, phone) VALUES 
('test@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1234567890')
ON CONFLICT (email) DO NOTHING;

-- Verify user created
SELECT * FROM users;