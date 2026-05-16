const crypto = require('crypto');
const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const PricingPlan = require('../models/PricingPlan');
const User = require('../models/User');

const getRazorpay = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
};

exports.createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await PricingPlan.findById(planId);
    if (!plan) return res.status(404).json({ success: false, message: 'Plan not found.' });

    const razorpay = getRazorpay();
    const options = {
      amount: plan.price * 100, // paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { planId: planId.toString(), userId: req.user._id.toString() },
    };

    const order = await razorpay.orders.create(options);

    const payment = await Payment.create({
      userId: req.user._id,
      planId,
      amount: plan.price,
      razorpayOrderId: order.id,
    });

    res.json({
      success: true,
      order,
      payment: payment._id,
      key: process.env.RAZORPAY_KEY_ID,
      plan,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      await Payment.findByIdAndUpdate(paymentId, { status: 'failed' });
      return res.status(400).json({ success: false, message: 'Payment verification failed.' });
    }

    const payment = await Payment.findByIdAndUpdate(
      paymentId,
      { razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature, status: 'completed' },
      { new: true }
    ).populate('planId');

    const plan = payment.planId;
    const user = await User.findById(payment.userId);
    const now = new Date();
    const expiresAt = new Date(now.getTime() + plan.duration * 24 * 60 * 60 * 1000);

    await User.findByIdAndUpdate(payment.userId, {
      isPremium: true,
      premiumExpiresAt: expiresAt,
    });

    res.json({ success: true, message: 'Payment verified! Premium access activated.', payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user._id })
      .populate('planId', 'name price durationLabel')
      .sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate('userId', 'name email')
      .populate('planId', 'name price')
      .sort({ createdAt: -1 });
    res.json({ success: true, payments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
