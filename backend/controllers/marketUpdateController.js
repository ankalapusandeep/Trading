const MarketUpdate = require('../models/MarketUpdate');

exports.getAll = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;
    const filter = {};
    if (category) filter.category = category;
    const updates = await MarketUpdate.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    const total = await MarketUpdate.countDocuments(filter);
    res.json({ success: true, updates, total, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const update = await MarketUpdate.findById(req.params.id);
    if (!update) return res.status(404).json({ success: false, message: 'Update not found.' });
    res.json({ success: true, update });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const update = await MarketUpdate.create(req.body);
    res.status(201).json({ success: true, update });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const update = await MarketUpdate.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!update) return res.status(404).json({ success: false, message: 'Update not found.' });
    res.json({ success: true, update });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await MarketUpdate.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
