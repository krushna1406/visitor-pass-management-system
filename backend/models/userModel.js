const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
   name:{
      type: String,
      required: true
   },
   email:{
      type: String,
      required: true,
      unique: true
   },
   password:{
      type:String,
      required: true
   },
   role:{
      type:String,
      required:true,
      enum: ['admin', 'employee', 'security']
   }
}, {timestamps: true})

userSchema.statics.signup = async function (name, email, password, role) {
   if(!name || !email || !password || !role) {
      throw Error('All fields are required')
   }

   const exists = await this.findOne({email});
   if(exists) {
      throw Error('User already exists!')
   }
   
   if(!validator.isEmail(email)) {
      throw Error('Email is not valid')
   }
   if(!validator.isStrongPassword(password)) {
      throw Error('Password is weak! Try again !!')
   }

   const salt = await bcrypt.genSalt(10);
   const hashed = await bcrypt.hash(password, salt);

   return await this.create({name, email, password: hashed, role})
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