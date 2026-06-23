const mongoose = require('mongoose')

const visitorSchema = new mongoose.Schema({
   name:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true
   },
   phone:{
      type: String,
      required: true
   },
   photo:{
      type: String
   },
   purpose:{
      type: String,
      required: true
   },
   employee:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },
   checkIn:{
      type: Date,
   },
   checkOut:{
      type: Date
   },
   status:{
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
   }
}, {timestamps: true})

module.exports = mongoose.model('Visitor', visitorSchema);