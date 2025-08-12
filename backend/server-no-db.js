const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Subscription Manager API', status: 'running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Mock auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'test@test.com' && password === 'password') {
    res.json({ 
      token: 'mock-jwt-token', 
      user: { id: 1, email: 'test@test.com' } 
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/auth/register', (req, res) => {
  res.status(201).json({ 
    message: 'User created successfully', 
    user: { id: 1, email: req.body.email } 
  });
});

// Mock subscription routes
app.get('/api/subscriptions', (req, res) => {
  res.json([
    {
      id: 1,
      plan_name: 'Basic Plan',
      status: 'active',
      price: 9.99,
      user_email: 'test@test.com',
      start_date: new Date().toISOString(),
      end_date: null
    }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log('Database connection disabled for testing');
});