const User = require('../models/userModel')
const Verification = require('../models/emailVerificationModel');
const verificationEmail = require('../templates/verificationEmail');
const sendEmail = require('../utils/sendEmail');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

exports.userSignupOtp = async (req, res) => {
   const { name, email, phone, password, role } = req.body;
   if(!name || !email || !phone || !password || !role) {
      throw Error('All fields are required')
   }
   
   const exists = await User.findOne({email});
   if(exists) {
      throw Error('User already exists!')
   }

   if(!validator.isEmail(email)) {
      throw Error('Email is not valid')
   }
   if(!validator.isStrongPassword(password)) {
      throw Error('Password is weak! Try again !!')
   }
   try{
      const otp = Math.floor(100000+ Math.random() * 900000).toString();
      const hashedOtp = await bcrypt.hash(otp, 10);

      await Verification.deleteMany({email});
      await Verification.create({name, email, phone, password, role, otp: hashedOtp, 
         expiresAt: new Date(Date.now() + 2 * 60 * 1000)
      });

      await sendEmail({
         to: email,
         subject: 'Email Verification OTP',
         html: verificationEmail(otp)
      })

      res.status(200).json({
         success: true,
         message: 'OTP sent successfully to email'
      })
   }catch(error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

exports.userSignup = async (req, res) => {

   const {email, otp} = req.body;
   try {
      if(!email || !otp) {
         throw Error("Email and OTP is required");
      }
      const verification = await Verification.findOne({email});
      if(!verification) {
         throw Error("Verification request not found");
      }

      if(verification.expiresAt < new Date()) {
         await Verification.deleteOne({_id: verification._id});
         throw Error('Otp expired. Please try again');
      }

      const match = await bcrypt.compare(otp, verification.otp);
      if(!match) {
         throw Error('Invalid OTP');
      }

      let empId = null;
      if (verification.role !== 'visitor') {
         const lastUser = await User.findOne({
            role: { $in: ['employee', 'security'] }
         }).sort({ createdAt: -1 })

         empId = lastUser ? lastUser.empId + 1 : 1000;
      }
      
      const userData = {
         name: verification.name,
         email: verification.email,
         phone: verification.phone,
         password: verification.password,
         role: verification.role
      }
      if(empId){
         userData.empId = empId;
      }
      const user = await User.signup(userData);
      await Verification.deleteOne({_id: verification._id});

      const token = createToken(user._id);

      res.status(201).json({
         success: true,
         _id: user._id, email, role: user.role, token
      })
   } catch (error) {
      console.log(error)
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}

exports.userLogin = async (req, res) => {
   const { email, password } = req.body;
   try {
      const user = await User.login(email, password)

      const token = createToken(user._id);

      res.status(200).json({
         success: true,
         _id: user._id, email, role: user.role, token
      })
   } catch (error) {
      res.status(400).json({
         success: false,
         message: error.message
      })
   }
}