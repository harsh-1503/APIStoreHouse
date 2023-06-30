const express = require('express');
const router = express.Router();
const { userCart, addItemToCart,removeItemFromCart } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/auth');
// const { addItemToCart } = require('../controllers/cartController');


router.route('/cart').get(isAuthenticatedUser, userCart)
router.route('/cart/addItemToCart').post(isAuthenticatedUser,addItemToCart)
router.route('/cart/removeItemFromCart').post(isAuthenticatedUser,removeItemFromCart)
// router.route('/updateCart').patch()
module.exports = router