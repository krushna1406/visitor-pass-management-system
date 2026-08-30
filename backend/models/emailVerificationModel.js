const mongoose = require('mongoose');

const VerificationScehma = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   phone: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   role:{
      type: String,
      required: true,
      enum: ['admin', 'employee', 'security', 'visitor']
   },
   otp: {
      type: String,
      required: true
   },
   expiresAt: {
      type: Date,
      required: true
   }
}, {timestamps: true});

module.exports = mongoose.model('VerifyEmail', VerificationScehma);