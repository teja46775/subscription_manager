const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(cors());
app.use(express.json());
app.use('/frontend', express.static('c:/Users/GYANAMAL/Desktop/GENAICASE STUDY/subscription-manager/frontend'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Subscription Manager API', status: 'running' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Try to load routes with error handling
try {
  const { initDB } = require('./config/database');
  const authRoutes = require('./routes/auth');
  const subscriptionRoutes = require('./routes/subscriptions');
  const logger = require('./utils/logger');
  
  // Routes
  app.use('/api/auth', authRoutes);
  app.use('/api/subscriptions', subscriptionRoutes);
  
  // Initialize database
  initDB().catch(err => console.log('DB init error:', err));
} catch (error) {
  console.log('Route loading error:', error.message);
}



// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to test`);
});

module.exports = app;