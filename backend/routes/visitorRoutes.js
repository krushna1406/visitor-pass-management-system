const router = require('express').Router();
const { getVisitors, getVisitor, createVisitor, updateVisitor, deleteVisitor, updateVisitorStatus, checkInVisitor, checkOutVisitor, getVisitorPass, getVisitorStats, verifyPass } = require('../controllers/visitorController')
const requireAuth = require('../middleware/requireAuth');
const { requireAdmin, requireEmployee, requireSecurity, requireVisitor } = require('../middleware/requireRole');

router.use(requireAuth);

router.get('/', getVisitors);
router.get('/:id', getVisitor);
router.post('/', createVisitor);

router.put('/:id', requireAdmin, updateVisitor);
router.delete('/:id', requireAdmin, deleteVisitor);

router.patch('/:id/status', requireEmployee, updateVisitorStatus);

router.get('/verify/:id', requireSecurity, verifyPass);

router.get('/visitor/pass', requireVisitor, getVisitorPass);
router.get('/visitor/stats', requireVisitor, getVisitorStats);

module.exports = router;