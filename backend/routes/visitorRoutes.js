const router = require('express').Router();
const {getVisitors, getVisitor, createVisitor, updateVisitor, deleteVisitor, updateVisitorStatus, checkInVisitor, checkOutVisitor} = require('../controllers/visitorController')
const requireAuth = require('../middleware/requireAuth');
const {requireAdmin, requireEmployee, requireSecurity} = require('../middleware/requireRole');

router.use(requireAuth);

router.get('/', getVisitors);
router.get('/:id', getVisitor);
router.post('/', requireSecurity, createVisitor);
router.put('/:id', requireAdmin, updateVisitor);
router.delete('/:id', requireAdmin, deleteVisitor);

router.patch('/:id/status', requireEmployee, updateVisitorStatus);
router.patch('/:id/checkin', requireSecurity, checkInVisitor);
router.patch('/:id/checkout', requireSecurity, checkOutVisitor);


module.exports = router;