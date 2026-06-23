
exports.requireEmployee = async (req, res, next) => {
   if(req.user.role !== 'employee') {
      return res.status(403).json({
         success: false,
         message: 'Access Forbidden'
      })
   }
   next();
}

exports.requireAdmin = (req, res, next) => {
   if(req.user.role !== 'admin') {
      return res.status(403).json({
         success: false,
         message: 'Access Forbidden'
      })
   }
   next();
}

exports.requireSecurity = (req, res, next) => {
   if(req.user.role !== 'security') {
      return res.status(403).json({
         success: false,
         message: 'Access Forbidden'
      })
   }
   next();
}

// This is fine if roles are limited (say 5-6)