-- Run these commands in PostgreSQL
CREATE DATABASE subscription_manager;

-- Connect to the database and create a user (optional)
CREATE USER sub_user WITH PASSWORD 'password123';
GRANT ALL PRIVILEGES ON DATABASE subscription_manager TO sub_user;