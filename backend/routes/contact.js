const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/auth');

router.post('/', ctrl.create);
router.get('/', protect, adminOnly, ctrl.getAll);
router.put('/:id/read', protect, adminOnly, ctrl.markRead);
router.delete('/:id', protect, adminOnly, ctrl.delete);

module.exports = router;
