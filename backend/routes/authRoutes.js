const router = require('express').Router();
const {userSignup, userLogin} = require('../controllers/authController')

router.post('/signup', userSignup);
router.post('/login', userLogin);

module.exports = router;