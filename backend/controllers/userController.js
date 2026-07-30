const User = require('../models/userModel')
const Visitor = require('../models/visitorModel')
const Checklog = require('../models/checkLogs');

exports.getAllUsers = async (req, res) => {
   try {
      const users = await User.find({}).select('empId name email phone role');
      if (!users.length) {
         return res.status(404).json({
            success: false,
            message: 'No user data available'
         })
      }
      res.status(200).json({
         success: true,
         users
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.adminDashboardStats = async (req, res) => {
   try {
      const totalEmployee = await User.countDocuments({ role: 'employee' })
      const totalVisitors = await Visitor.countDocuments();
      const pending = await Visitor.countDocuments({ status: 'pending' })

      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const todaysVisitors = await Visitor.countDocuments({
         visitDate:{
            $gte: start,
            $lte: end
         }
      });
      const currentlyInside = await Checklog.countDocuments({
         checkIn: { $ne: null },
         checkOut: null
      });
      const checkedOutToday = await Checklog.countDocuments({
         checkOut: {
            $gte: start,
            $lte: end
         }
      });

      res.status(200).json({
         success: true,
         stats: { totalEmployee, totalVisitors, pending, todaysVisitors, currentlyInside, checkedOutToday}
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: 'Error fetching data from server',
         stats: { totalEmployee: null, totalVisitors: null, pending: null }
      })
   }
}

exports.deleteUser = async (req, res) => {
   const { id } = req.params;
   try {
      const user = await User.findByIdAndDelete(id);
      if (!user) {
         return res.status(404).json({
            success: false,
            message: 'User data not found'
         })
      }
      res.status(200).json({
         success: true,
         message: 'User deleted'
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.employeeDashboardStats = async (req, res) => {
   const id = req.user._id;

   try {
      const totalVisits = await Visitor.countDocuments({ employee: id });
      const upcomingVisitors = await Visitor.countDocuments({
         employee: id,
         status: 'approved'
      });
      const pending = await Visitor.countDocuments({
         employee: id,
         status: 'pending'
      });

      res.status(200).json({
         success: true,
         stats: { totalVisits, upcomingVisitors, pending }
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: 'Error fetching employee stats',
         stats: { totalVisits: null, upcomingVisitors: null, pendingRequests: null }
      })
   }
}

exports.getEmployeeVisitors = async (req, res) => {
   try {
      const employeeId = req.user._id;
      const visitors = await Visitor.find({ employee: employeeId }).populate('employee', 'empId name email').sort({ createdAt: -1 });

      res.status(200).json({
         success: true,
         visitors
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.securityDashboardStats = async (req, res) => {
   try {
      const start = new Date();
      start.setHours(0, 0, 0, 0);

      const end = new Date();
      end.setHours(23, 59, 59, 999);

      const todaysVisitors = await Checklog.find({
         checkIn: {
            $gte: start,
            $lte: end
         }
      }).populate('visitor','name email purpose')

      const todaysVisitorsCount = todaysVisitors.length;
      const currentlyInside = await Checklog.countDocuments({
         checkIn: { $ne: null },
         checkOut: null
      });
      const checkedOutToday = await Checklog.countDocuments({
         checkOut: {
            $gte: start,
            $lte: end
         }
      });

      res.status(200).json({
         success: true,
         todaysVisitors,
         stats: { todaysVisitorsCount, currentlyInside, checkedOutToday }
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}