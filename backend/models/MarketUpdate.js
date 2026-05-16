const mongoose = require('mongoose');

const marketUpdateSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  category: { type: String, enum: ['Equity', 'Commodity', 'Forex', 'Crypto', 'Index', 'General'], default: 'General' },
  image: { type: String, default: '' },
  tags: [{ type: String }],
  isPremium: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketUpdate', marketUpdateSchema);
