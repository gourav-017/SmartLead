const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cron = require('node-cron');
const connectDB = require('./config/db');
const leadRoutes = require('./routes/leadRoutes');
const syncService = require('./services/syncService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(express.json());

// Routes
app.use('/api/leads', leadRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Smart Lead API is running' });
});

app.get('/', (req, res) => {
  res.send('Welcome to the Smart Lead API');
});



// Background job scheduler - runs every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Running scheduled CRM sync job...');
  syncService.syncVerifiedLeads();
});


async function startServer() {
  try {
        await connectDB();


    // Only listen when not running in a serverless environment (e.g., Vercel)
    if (process.env.NODE_ENV!=="production") {
      app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error('Server startup error:', err);
    process.exit(1);
  }
}

startServer();

// Export app for serverless platforms like Vercel
module.exports = app;

