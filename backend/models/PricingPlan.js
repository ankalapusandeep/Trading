const mongoose = require('mongoose');

const pricingPlanSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true },
  duration: { type: Number, required: true }, // in days
  durationLabel: { type: String, required: true }, // e.g., "1 Month"
  features: [{ type: String }],
  isActive: { type: Boolean, default: true },
  isPopular: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PricingPlan', pricingPlanSchema);
