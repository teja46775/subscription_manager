-- Update phone numbers to 10-digit Indian numbers

-- Update existing users with Indian phone numbers
UPDATE users SET phone = '9876543210' WHERE email = 'test@test.com';
UPDATE users SET phone = '8765432109' WHERE email = 'admin@test.com';

-- Add more sample users with Indian phone numbers
INSERT INTO users (email, password, phone) VALUES 
('user1@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9123456789'),
('user2@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '8234567890'),
('user3@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '7345678901'),
('user4@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '9456789012'),
('user5@gmail.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '8567890123')
ON CONFLICT (email) DO NOTHING;

-- Check updated phone numbers
SELECT email, phone FROM users;