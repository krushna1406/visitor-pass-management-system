const { getAllUsers, adminDashboardStats, deleteUser, employeeDashboardStats, getEmployeeVisitors } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth');
const {requireAdmin, requireEmployee} = require('../middleware/requireRole')

const router = require('express').Router();

router.get('/', requireAuth, requireAdmin, getAllUsers);
router.get('/admin/dashboard/stats', adminDashboardStats);
router.delete('/:id', requireAuth, requireAdmin, deleteUser)

// Employee-specific routes
router.get('/employee/dashboard/stats', requireAuth, requireEmployee, employeeDashboardStats);
router.get('/employee/visitors', requireAuth, requireEmployee, getEmployeeVisitors);

module.exports = router;