const express = require('express')
const { registerUser, loginuser, logout, forgotPassword, resetPasswordNow, updatePassword } = require('../controllers/userController')
const { isAuthenticatedUser } = require('../middlewares/auth')
const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginuser)
router.route("/logout").get(logout)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').post(resetPasswordNow)
router.route('/password/update').get(isAuthenticatedUser,updatePassword)

module.exports = router 
