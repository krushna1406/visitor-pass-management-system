const Visitor = require('../models/visitorModel')
const User = require('../models/userModel')
const Checklog = require('../models/checkLogs');
const sendEmail = require('../utils/sendEmail');
const approvalEmail = require('../templates/approvalEmail');
const rejectionEmail = require('../templates/rejectionEmail');
const generatePass = require('../utils/generateVisitorPass');
const QRCode = require('qrcode');
const cloudinary = require('../config/cloudinary');
const {Parser} = require('json2csv');
const document = require('pdfkit');

exports.createVisitor = async (req, res) => {
   const data = req.body;

   let employeeId;
   try {
      if (req.user.role === 'employee') {
         employeeId = req.user._id;
      }
      else if (req.user.role === 'visitor') {
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

      let photoUrl = null;

      if(req.file) {
         const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream({
               folder: 'visitor-pass-mgmt/visitors'
            }, (error, result) => {
               if(error) reject(error);
               else resolve(result);
            }
            )
            uploadStream.end(req.file.buffer);
         })
         photoUrl = result.secure_url;
      }

      const visitor = await Visitor.create({ ...data, employee: employeeId, photo: photoUrl });
      res.status(201).json({
         success: true,
         message: 'Visitor created successfully',
         visitor
      })
   } catch(error) {
      console.log('Inside visitor controller\n',error);
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
      ).populate('employee', 'name email');

      if (updatedVisitor.status === 'approved') {
         const pdfPath = await generatePass(updatedVisitor);
         try {
            await sendEmail({
               to: updatedVisitor.email,
               subject: 'Visit Approval Confirmation',
               html: approvalEmail(updatedVisitor),
               attachments: [
                  {
                     filename: 'visitor_pass.pdf',
                     path: pdfPath
                  }
               ]
            })
         } catch (error) {
            console.error(error);
         }
         
         const fs = require("fs/promises");
         try {
            await fs.unlink(pdfPath);

         } catch (err) {
            console.error("Delete failed:", err);
         }
      }

      if (updatedVisitor.status === 'rejected') {
         await sendEmail({
            to: updatedVisitor.email,
            subject: 'regarding Visit rejection',
            html: rejectionEmail(updatedVisitor)
         })
      }

      res.status(200).json({
         success: true,
         message: `Visit ${status}`
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

exports.getVisitorStats = async (req, res) => {
   try {
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
         stats: { totalVisits, pending, approved, rejected }
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.getVisitorPass = async (req, res) => {
   try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const passes = await Visitor.find({
         email: req.user.email,
         passGenerated: true,
         visitDate: { $gte: today }
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
   try {
      const visitor = await Visitor.findById(req.params.id).populate('employee', 'empId name email');

      if (!visitor) {
         return res.status(400).json({
            success: false,
            message: 'Invalid Pass'
         })
      }

      const activeLog = await Checklog.findOne({
         visitor: visitor._id,
         checkOut: null
      })

      res.status(200).json({
         success: true,
         visitor,
         activeLog
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.exportVisitorsCSV = async (req, res) => {
   try{
      const visitors = await Visitor.find({}).populate('employee', 'empId name email')
      .lean();

      const data = visitors.map(visitor => ({
         Name: visitor.name,
         Email: visitor.email,
         Phone: visitor.phone,
         Purpose: visitor.purpose,
         Employee_Id: visitor.employee?.empId || '',
         Employee_Name: visitor.employee?.name || '',
         Employee_Email: visitor.employee?.email || '',
         Visit_Date: visitor.visitDate,
         Status: visitor.status,
         Created_At: visitor.createdAt
      }));

      const fields = [
         'Name', 'Email', 'Phone', 'Purpose', 'Employee_Id', 'Employee_Name', 'Employee_Email', 'Visit_Date', 'Status', 'Created_At'
      ]

      const parser = new Parser({fields});
      const csv = parser.parse(data);

      res.header('Content-Type', 'text/csv');
      res.attachment('visitors.csv');
      res.send(csv);

   }catch(error) {
      console.log('Csv export error:', error);

      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.exportVisitorsPDF = async (req, res) => {
   try{
      const visitors = await Visitor.find({}).populate('employee', 'empId name email').lean();

      const doc = new document({margin:40});

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="visitors_data.pdf"');

      doc.pipe(res);

      doc.fontSize(20).text('Visitor Pass Management System', {
         align: 'center'
      });

      doc.moveDown();
      
      doc.fontSize(16).text('Visitor Records', {
         align: 'center'
      });

      doc.moveDown(2);

      visitors.forEach((visitor, index) => {

         doc.fontSize(12).text(`Visitor ${index + 1}`, {
            underline: true
         });

         doc.moveDown(0.5);
         doc.fontSize(10);

         doc.text(`Name: ${visitor.name}`);
         doc.text(`Email: ${visitor.email}`);
         doc.text(`Phone: ${visitor.phone}`);
         doc.text(`Purpose: ${visitor.purpose}`);
         doc.text(
            `Employee: ${visitor.employee?.name || 'N/A'}`
         );
         doc.text(
            `Employee ID: ${visitor.employee?.empId || 'N/A'}`
         );
         doc.text(
            `Visit Date: ${new Date(visitor.visitDate).toLocaleString()}`
         );
         doc.text(`Status: ${visitor.status}`);
         doc.text(
            `Pass Generated: ${visitor.passGenerated ? 'Yes' : 'No'}`
         );

         doc.moveDown();

         doc.moveTo(40, doc.y)
            .lineTo(555, doc.y)
            .stroke();

         doc.moveDown();
      });
      doc.end();
      
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}