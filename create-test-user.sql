-- Run this in PostgreSQL to create test user
INSERT INTO users (email, password, phone) VALUES 
('test@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', '+1234567890')
ON CONFLICT (email) DO NOTHING;