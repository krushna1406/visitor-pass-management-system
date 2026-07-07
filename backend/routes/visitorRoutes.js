const router = require('express').Router();
const { getVisitors, getVisitor, createVisitor, updateVisitor, deleteVisitor, updateVisitorStatus, checkInVisitor, checkOutVisitor, getVisitorPass } = require('../controllers/visitorController')
const requireAuth = require('../middleware/requireAuth');
const { requireAdmin, requireEmployee, requireSecurity, requireVisitor } = require('../middleware/requireRole');

router.use(requireAuth);

router.get('/', getVisitors);
router.get('/:id', getVisitor);
router.post('/', createVisitor);

router.put('/:id', requireAdmin, updateVisitor);
router.delete('/:id', requireAdmin, deleteVisitor);

router.patch('/:id/status', requireEmployee, updateVisitorStatus);

router.patch('/:id/checkin', requireSecurity, checkInVisitor);
router.patch('/:id/checkout', requireSecurity, checkOutVisitor);

router.get('/:id/pass', requireVisitor, getVisitorPass);

module.exports = router;