const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {
   const { authorization } = req.headers;
   try {

      if (!authorization) {
         return res.status(400).json({
            success:false,
            message: 'Authentication token is required'
         })
      }
      const token = authorization.split(' ')[1];

      const { _id } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({ _id }).select('_id role');

      next();
   } catch (error) {
      res.status(401).json({
         success: false,
         message: 'Request is not authorized'
      })
   }
}

module.exports = requireAuth;