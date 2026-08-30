const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   empId:{
      type: Number,
      unique: true,
      sparse: true,
      required: function() {
         return this.role === 'employee' || this.role === 'security'
      }
   },
   name:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true,
      unique: true
   },
   phone: {
      type: String,
      required: true
   },
   password:{
      type:String,
      required: true
   },
   role:{
      type:String,
      required:true,
      enum: ['admin', 'employee', 'security', 'visitor']
   }
}, {timestamps: true})

userSchema.statics.signup = async function (userData) {
   const salt = await bcrypt.genSalt(10);
   const hashed = await bcrypt.hash(userData.password, salt);

   const user = await this.create({...userData, password: hashed});
   return user;
}

userSchema.statics.login = async function (email, password) {
   if(!email || !password) {
      throw Error('All fields are required')
   }
   const exists = await this.findOne({email});
   if(!exists) {
      throw Error('No account with this email!')
   }
   
   const match = await bcrypt.compare(password, exists.password);
   if(!match) {
      throw Error('Incorrect Password')
   }

   return exists;
}

module.exports = mongoose.model('User', userSchema)