const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Test routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is working!', timestamp: new Date() });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

app.listen(PORT, () => {
  console.log(`Simple server running on http://localhost:${PORT}`);
});