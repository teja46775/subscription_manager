const express = require('express');
const { pool } = require('../config/database');
const { subscriptionSchema } = require('../utils/validation');
const { authenticateToken } = require('../middleware/auth');
const logger = require('../utils/logger');

const router = express.Router();

// Get all subscriptions with filtering
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status, plan_name } = req.query;
    let query = `
      SELECT s.*, u.email as user_email 
      FROM subscriptions s 
      JOIN users u ON s.user_id = u.id 
      WHERE 1=1
    `;
    const params = [];

    if (status) {
      params.push(status);
      query += ` AND s.status = $${params.length}`;
    }

    if (plan_name) {
      params.push(`%${plan_name}%`);
      query += ` AND s.plan_name ILIKE $${params.length}`;
    }

    query += ' ORDER BY s.created_at DESC';

    const result = await pool.query(query, params);
    logger.info('Subscriptions retrieved', { count: result.rows.length, userId: req.user.userId });
    res.json(result.rows);
  } catch (error) {
    logger.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create subscription
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { error } = subscriptionSchema.validate(req.body);
    if (error) {
      logger.warn('Subscription validation failed:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { plan_name, status, price, end_date } = req.body;
    
    const result = await pool.query(
      'INSERT INTO subscriptions (user_id, plan_name, status, price, end_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.userId, plan_name, status || 'active', price, end_date]
    );

    logger.info('Subscription created', { subscriptionId: result.rows[0].id, userId: req.user.userId });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    logger.error('Error creating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update subscription
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = subscriptionSchema.validate(req.body);
    if (error) {
      logger.warn('Subscription update validation failed:', error.details[0].message);
      return res.status(400).json({ error: error.details[0].message });
    }

    const { plan_name, status, price, end_date } = req.body;
    
    const result = await pool.query(
      'UPDATE subscriptions SET plan_name = $1, status = $2, price = $3, end_date = $4 WHERE id = $5 RETURNING *',
      [plan_name, status, price, end_date, id]
    );

    if (result.rows.length === 0) {
      logger.warn('Subscription not found for update', { subscriptionId: id });
      return res.status(404).json({ error: 'Subscription not found' });
    }

    logger.info('Subscription updated', { subscriptionId: id, userId: req.user.userId });
    res.json(result.rows[0]);
  } catch (error) {
    logger.error('Error updating subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete subscription
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query('DELETE FROM subscriptions WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      logger.warn('Subscription not found for deletion', { subscriptionId: id });
      return res.status(404).json({ error: 'Subscription not found' });
    }

    logger.info('Subscription deleted', { subscriptionId: id, userId: req.user.userId });
    res.json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    logger.error('Error deleting subscription:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;