const CheckLog = require('../models/checkLogs');
const Visitor = require('../models/visitorModel');

exports.checkInVisitor = async (req, res) => {
   const {id} = req.params;
   try{
      const visitor = await Visitor.findById(id);
      if(!visitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }

      const exists = await CheckLog.findOne({
         visitor: id,
         checkOut: null
      })
      if(exists) {
         return res.status(400).json({
            success: false,
            message: 'Already Checked-in'
         })
      }

      if(visitor.status !== 'approved') {
         return res.status(400).json({
            success: false,
            message: 'Not Approved'
         })
      }

      const log = await CheckLog.create({
         visitor: id,
         security: req.user._id,
         checkIn: new Date()
      })

      res.status(200).json({
         success: true,
         message: 'Visitor check-in successful',
         log
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}