const mongoose = require('mongoose');

const CheckLogSchema = new mongoose.Schema({
   visitor:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visitor',
      required: true
   },

   security:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
   },

   checkIn:{
      type: Date
   },

   checkOut:{
      type: Date,
      default: null
   }
}, {timestamps: true})

module.exports = mongoose.model('CheckLog', CheckLogSchema);