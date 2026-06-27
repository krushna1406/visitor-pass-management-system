const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
   return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '1d' })
}

exports.userSignup = async (req, res) => {

   const { name, email, password, role } = req.body;
   try {
      const lastUser = await User.findOne({
         role: {$in: ['employee', 'security']}
      }).sort({ createdAt: -1 })

      const empId = lastUser ? lastUser.empId + 1 : 1000;
      const user = await User.signup(empId, name, email, password, role);

      const token = createToken(user._id);

      res.status(201).json({
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