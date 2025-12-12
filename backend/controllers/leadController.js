const Lead = require('../models/Lead');
const nationalizeService = require('../services/nationalizeService');

/**
 * Process a batch of names and apply business logic.
 */
async function processLeads(req, res) {
  try {
    const { names } = req.body;

    if (!names || !Array.isArray(names) || names.length === 0) {
      return res.status(400).json({
        error: 'Please provide a non-empty array of names',
      });
    }

    const results = await nationalizeService.processBatch(names);

    const savedLeads = await Promise.all(
      results.map(async (result) => {
        const status = result.probability >= 0.6 ? 'Verified' : 'To Check';
        const existingLead = await Lead.findOne({ name: result.name });

        if (existingLead) {
          existingLead.predictedCountry = result.country;
          existingLead.confidenceScore = result.probability;
          existingLead.status = status;
          await existingLead.save();
          return existingLead;
        } else {
          const lead = new Lead({
            name: result.name,
            predictedCountry: result.country,
            confidenceScore: result.probability,
            status,
          });
          await lead.save();
          return lead;
        }
      })
    );

    res.json({
      message: `Successfully processed ${savedLeads.length} lead(s)`,
      leads: savedLeads,
    });
  } catch (error) {
    console.error('Error processing leads:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

/**
 * Get all leads with optional status filter.
 */
async function getLeads(req, res) {
  try {
    const { status } = req.query;
    const query = status ? { status } : {};
    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

/**
 * Get lead statistics.
 */
async function getStats(req, res) {
  try {
    const total = await Lead.countDocuments();
    const verified = await Lead.countDocuments({ status: 'Verified' });
    const toCheck = await Lead.countDocuments({ status: 'To Check' });
    const synced = await Lead.countDocuments({ syncedToCRM: true });

    res.json({
      total,
      verified,
      toCheck,
      synced,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}

module.exports = {
  processLeads,
  getLeads,
  getStats,
};

