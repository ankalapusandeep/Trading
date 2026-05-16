const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/testimonialController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', ctrl.getAll);
router.get('/admin/all', protect, adminOnly, ctrl.getAllAdmin);
router.post('/', protect, adminOnly, ctrl.create);
router.put('/:id', protect, adminOnly, ctrl.update);
router.delete('/:id', protect, adminOnly, ctrl.delete);

module.exports = router;
