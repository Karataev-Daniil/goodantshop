import express from 'express';
import dotenv from 'dotenv';
import handler from './api/order.js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  next();
});

// Routes
app.post('/order', async (req, res) => {
  try {
    await handler(req, res);
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('Environment:', {
    hasApiKey: !!process.env.RESEND_API_KEY,
    hasOrderEmail: !!process.env.ORDER_EMAIL,
    hasFromEmail: !!process.env.FROM_EMAIL,
  });
  console.log('Note: on Vercel production, API calls should use /api/order and not localhost.');
});
