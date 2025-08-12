const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const { userSchema, loginSchema } = require('../utils/validation');
const { JWT_SECRET } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      logger.warn('Registration validation failed:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password, phone } = req.body;
    
    // Check if user exists
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      logger.warn('Registration failed: User already exists', { email });
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const result = await pool.query(
      'INSERT INTO users (email, password, phone) VALUES ($1, $2, $3) RETURNING id, email, phone',
      [email, hashedPassword, phone]
    );

    logger.info('User registered successfully', { userId: result.rows[0].id, email });
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    logger.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      logger.warn('Login validation failed:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    
    // Find user
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      logger.warn('Login failed: Invalid credentials', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      logger.warn('Login failed: Invalid password', { email });
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    logger.info('User logged in successfully', { userId: user.id, email });
    res.json({ 
      token, 
      user: { id: user.id, email: user.email, phone: user.phone } 
    });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;