const { checkInVisitor, checkOutVisitor } = require('../controllers/checkLogController');
const requireAuth = require('../middleware/requireAuth');
const { requireSecurity } = require('../middleware/requireRole');
const router = require('express').Router();

router.use(requireAuth);

router.post('/:id/checkin',requireSecurity, checkInVisitor);
router.patch('/:id/checkout', requireSecurity, checkOutVisitor);

module.exports = router;