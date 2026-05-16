const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/paymentController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/create-order', protect, ctrl.createOrder);
router.post('/verify', protect, ctrl.verifyPayment);
router.get('/my-payments', protect, ctrl.getMyPayments);
router.get('/all', protect, adminOnly, ctrl.getAllPayments);

module.exports = router;
