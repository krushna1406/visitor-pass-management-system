const Visitor = require('../models/visitorModel')

exports.createVisitor= async (req, res) => {
   try{
      const visitor = await Visitor.create(req.body);
      res.status(201).json({
         success: true,
         message: 'Visitor created successfully',
         visitor
      })
   }catch(error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitors = async (req, res) => {
   try{
      const visitors = await Visitor.find({}).populate('employee', 'empId name email')

      res.status(200).json({
         success: true,
         message: 'fetch successful',
         visitors
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitor = async (req, res) => {
   const {id} = req.params;
   try{
      const visitor = await Visitor.findById(id);
      if(!visitor) {
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
   }catch(error) {
      res.status(404).json({
         success: false,
         message: error.message
      })
   }
}

exports.updateVisitor = async (req, res) => {
   const {id} = req.params;
   const data = req.body;
   try{
      const updatedVisitor = await Visitor.findByIdAndUpdate(id, data, {new: true})
      if(!updatedVisitor) {
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
   }catch(error) {
      res.status(404).json({
         success: false,
         message: error.message
      })
   }
}

exports.updateVisitorStatus = async (req, res) => {
   const {id} = req.params;
   const {status, checkOut} = req.body;
   
   try{
      const visitor = await Visitor.findById(id);
      if(!visitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }

      if(visitor.employee.toString() === req.user._id.toString() === false) {
         return res.status(403).json({
            success: false,
            message: 'Forbidden'
         })
      }

      // if(!['approved', 'rejected'].includes(status)) {
      //    return res.status(400).json({
      //       success: false,
      //       messgage: 'Invalid status'
      //    })
      // }

      if(visitor.checkOut) {
         return res.status(400).json({
            success: false,
            message:"Visitor already checked out"
         })
      }
      visitor.status = status;
      await visitor.save();

      res.status(200).json({
         success: true,
         message: `Visit ${status}`    // Dynamically show the approved or rejected status
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.deleteVisitor = async (req, res) => {
   const {id} = req.params;

   try{
      const visitor = await Visitor.findByIdAndDelete(id);
      if(!visitor) {
         return res.status(404).json({
            success: false,
            message: 'No visitor found'
         })
      }
      res.status(200).json({
         success: true,
         message: 'Visitor records deleted'
      })
   }catch(error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

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
      if(visitor.status !== 'approved'){
         return res.status(400).json({
            success:false,
            message:'Visit is not approved'
         })
      }
      if(visitor.checkIn) {
         return res.status(400).json({
            success: false,
            message: 'Already checked-in!'
         })
      }
      visitor.checkIn = new Date();
      await visitor.save();

      res.status(200).json({
         success: true,
         message: 'Visitor check in successful',
         visitor
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.checkOutVisitor = async (req, res) => {
   const {id} = req.params;

   try{
      const visitor = await Visitor.findById(id);
      if(!visitor) {
         return res.status(404).json({
            success: false,
            message: 'Visitor not found'
         })
      }
      if(!visitor.checkIn) {
         return res.status(400).json({
            success: false,
            message: 'Cannot check-out without check-in first'
         })
      }
      if(visitor.checkOut) {
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

   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}