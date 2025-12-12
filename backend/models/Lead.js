const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  predictedCountry: {
    type: String,
    required: true
  },
  confidenceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 1
  },
  status: {
    type: String,
    enum: ['Verified', 'To Check'],
    required: true
  },
  syncedToCRM: {
    type: Boolean,
    default: false
  },
  syncedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for efficient querying of unsynced verified leads
leadSchema.index({ status: 1, syncedToCRM: 1 });

module.exports = mongoose.model('Lead', leadSchema);


