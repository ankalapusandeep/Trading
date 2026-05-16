const User = require('../models/User');
const Payment = require('../models/Payment');
const MarketUpdate = require('../models/MarketUpdate');
const ContactMessage = require('../models/ContactMessage');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ role: 'user' });
    const premiumUsers = await User.countDocuments({ isPremium: true });
    const totalRevenue = await Payment.aggregate([
      { $match: { status: 'completed' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalUpdates = await MarketUpdate.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ isRead: false });
    const recentPayments = await Payment.find({ status: 'completed' })
      .populate('userId', 'name email')
      .populate('planId', 'name price')
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      stats: {
        totalUsers,
        premiumUsers,
        totalRevenue: totalRevenue[0]?.total || 0,
        totalUpdates,
        unreadMessages,
      },
      recentPayments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'User deleted.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
