const express = require('express');
const router = express.Router();
const {
  processLeads,
  getLeads,
  getStats,
} = require('../controllers/leadController');

// POST /api/leads/process - batch processing
router.post('/process', processLeads);

// GET /api/leads - list leads with optional status filter
router.get('/', getLeads);

// GET /api/leads/stats - stats summary
router.get('/stats', getStats);

module.exports = router;


