const router = require('express').Router();
const {userSignup, userLogin, userSignupOtp} = require('../controllers/authController')

router.post('/signup', userSignup);
router.post('/verify-email', userSignupOtp);
router.post('/login', userLogin);

module.exports = router;