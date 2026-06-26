const { getAllUsers, dashboardStats } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const {requireAdmin} = require('../middleware/requireRole')

const router = require('express').Router();

router.get('/', requireAuth, requireAdmin, getAllUsers);
router.get('/dashboard/stats', dashboardStats);

module.exports = router;