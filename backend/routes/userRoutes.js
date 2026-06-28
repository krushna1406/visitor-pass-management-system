const { getAllUsers, adminDashboardStats, deleteUser, employeeDashboardStats, getEmployeeVisitors, securityDashboardStats } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const {requireAdmin, requireEmployee, requireSecurity} = require('../middleware/requireRole')

const router = require('express').Router();

router.get('/', requireAuth, requireAdmin, getAllUsers);
router.get('/admin/dashboard/stats', adminDashboardStats);
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

// Employee-specific routes
router.get('/employee/:id/dashboard/stats', requireAuth, requireEmployee, employeeDashboardStats);
router.get('/employee/visitors', requireAuth, requireEmployee, getEmployeeVisitors);

//Security-specific routes
router.get('/security/dashboard/stats', requireAuth, requireSecurity, securityDashboardStats);

module.exports = router;