const { checkInVisitor } = require('../controllers/checkLogController');
const requireAuth = require('../middleware/requireAuth');
const { requireSecurity } = require('../middleware/requireRole');
const router = require('express').Router();

router.use(requireAuth);

router.post('/:id/checkin',requireSecurity, checkInVisitor);

module.exports = router;