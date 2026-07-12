const Visitor = require('../models/visitorModel')
const User = require('../models/userModel')

const QRCode = require('qrcode');

exports.createVisitor = async (req, res) => {
   const data = req.body;
   
   let employeeId;
   try {
      if (req.user.role === 'employee') {
         employeeId = req.user._id;
      } 
      else if(req.user.role === 'visitor') {
         const employee = await User.findOne({
            empId: req.body.employee,
            role: 'employee'
         })

         if (!employee) {
            return res.status(404).json({
               success: false,
               message: 'Employee not found'
            })
         }
         employeeId = employee._id;
      }
      const visitor = await Visitor.create({...data, employee: employeeId});
      res.status(201).json({
         success: true,
         message: 'Visitor created successfully',
         visitor
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitors = async (req, res) => {
   try {
      const visitors = await Visitor.find({}).populate('employee', 'empId name email').sort()

      res.status(200).json({
         success: true,
         message: 'fetch successful',
         visitors
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitor = async (req, res) => {
   const { id } = req.params;
   try {
      const visitor = await Visitor.findById(id);
      if (!visitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }
      res.status(200).json({
         success: true,
         message: 'Visitor details found',
         visitor
      })
   } catch (error) {
      res.status(404).json({
         success: false,
         message: error.message
      })
   }
}

exports.updateVisitor = async (req, res) => {
   const { id } = req.params;
   const data = req.body;
   try {
      const updatedVisitor = await Visitor.findByIdAndUpdate(id, data, { new: true })
      if (!updatedVisitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }
      res.status(200).json({
         success: true,
         message: 'Visitor details updated',
         updatedVisitor
      })
   } catch (error) {
      res.status(404).json({
         success: false,
         message: error.message
      })
   }
}

exports.updateVisitorStatus = async (req, res) => {
   const { id } = req.params;
   const { status } = req.body;

   let qrCode = null;

   try {
      const visitor = await Visitor.findById(id);
      if (!visitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }

      if (visitor.employee.toString() !== req.user._id.toString()) {
         return res.status(403).json({
            success: false,
            message: 'Forbidden'
         })
      }

      if (status === 'approved') {

         qrCode = await QRCode.toDataURL(
            visitor._id.toString()
         )
      }

      const updatedVisitor = await Visitor.findByIdAndUpdate(id, {
         status,
         qrCode,
         passGenerated: status === 'approved'
      },
         { new: true }
      );

      res.status(200).json({
         success: true,
         message: `Visit ${status}`    // Dynamically show the approved or rejected status
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.deleteVisitor = async (req, res) => {
   const { id } = req.params;

   try {
      const visitor = await Visitor.findByIdAndDelete(id);
      if (!visitor) {
         return res.status(404).json({
            success: false,
            message: 'No visitor found'
         })
      }
      res.status(200).json({
         success: true,
         message: 'Visitor records deleted'
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.checkOutVisitor = async (req, res) => {
   const { id } = req.params;

   try {
      const visitor = await Visitor.findById(id);
      if (!visitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }
      if (!visitor.checkIn) {
         return res.status(400).json({
            success: false,
            message: 'Cannot check-out without check-in first'
         })
      }
      if (visitor.checkOut) {
         return res.status(400).json({
            success: false,
            message: 'Already checked out!'
         })
      }
      visitor.checkOut = new Date();
      await visitor.save();

      res.status(200).json({
         success: true,
         message: 'Visitor check out successful',
         visitor
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitorStats = async (req, res) => {
   try{
      const totalVisits = await Visitor.countDocuments({
         email: req.user.email
      })

      const pending = await Visitor.countDocuments({
         email: req.user.email,
         status: 'pending'
      })

      const approved = await Visitor.countDocuments({
         email: req.user.email,
         status: 'approved'
      })

      const rejected = await Visitor.countDocuments({
         email: req.user.email,
         status: 'rejected'
      })

      res.status(200).json({
         success: true,
         stats: {totalVisits, pending, approved, rejected}
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitorPass = async (req, res) => {
   try {
      const passes = await Visitor.find({
         email: req.user.email,
         passGenerated: true
      }).populate('employee', 'name email');

      if (!passes.length) {
         return res.status(404).json({
            success: false,
            message: 'Pass not found'
         })
      }

      res.status(200).json({
         success: true,
         passes
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.verifyPass = async (req, res) => {
   try{
      const visitor = await Visitor.findById(req.params.id).populate('employee', 'empId name email');

      if(!visitor) {
         return res.status(400).json({
            success: false,
            message: 'Invalid Pass'
         })
      }

      res.status(200).json({
         success: true,
         visitor
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}