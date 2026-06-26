const User = require('../models/userModel')
const Visitor = require('../models/visitorModel')

exports.getAllUsers = async (req, res) => {
   try{
      const users = await User.find({}).select('empId name email role');
      if(!users.length) {
         return res.status(404).json({
            success: false,
            message: 'No user data available'
         })
      }
      res.status(200).json({
         success: true,
         users
      })
   }catch(error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.dashboardStats = async (req, res) => {
   try{
      const totalEmployee = await User.countDocuments({role: 'employee'})
      const totalVisitors = await Visitor.countDocuments();
      const pending = await Visitor.countDocuments({status: 'pending'})

      res.status(200).json({
         success: true,
         stats:{ totalEmployee, totalVisitors, pending}
      })
   }catch(error) {
      res.status(400).json({
         success: false,
         message: 'Error fetching data from server',
         stats: {totalEmployee: null, totalVisitors: null, pending: null}
      })
   }
}