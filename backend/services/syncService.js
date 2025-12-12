const Lead = require('../models/Lead');

/**
 * Syncs verified leads to CRM (simulated by logging)
 * Ensures idempotency by checking syncedToCRM flag
 */
async function syncVerifiedLeads() {
  try {
    // Find all verified leads that haven't been synced yet
    const verifiedLeads = await Lead.find({
      status: 'Verified',
      syncedToCRM: false
    });

    if (verifiedLeads.length === 0) {
      console.log('[CRM Sync] No new verified leads to sync.');
      return;
    }

    console.log(`[CRM Sync] Found ${verifiedLeads.length} verified lead(s) to sync.`);

    // Process each lead
    for (const lead of verifiedLeads) {
      // Simulate CRM sync by logging
      console.log(`[CRM Sync] Sending verified lead ${lead.name} to Sales Team...`);

      // Mark as synced to ensure idempotency
      lead.syncedToCRM = true;
      lead.syncedAt = new Date();
      await lead.save();
    }

    console.log(`[CRM Sync] Successfully synced ${verifiedLeads.length} lead(s).`);
  } catch (error) {
    console.error('[CRM Sync] Error syncing leads:', error.message);
  }
}

module.exports = {
  syncVerifiedLeads
};

