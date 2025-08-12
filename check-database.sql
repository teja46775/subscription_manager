-- Run these queries in PostgreSQL to see your data

-- Check all users
SELECT * FROM users;

-- Check all subscriptions
SELECT * FROM subscriptions;

-- Check subscriptions with user details (joined view)
SELECT 
    s.id,
    s.plan_name,
    s.status,
    s.price,
    u.email as user_email,
    s.start_date,
    s.end_date,
    s.created_at
FROM subscriptions s
JOIN users u ON s.user_id = u.id
ORDER BY s.created_at DESC;