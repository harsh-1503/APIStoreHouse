const express = require('express');
const { isAuthenticatedUser } = require('../middlewares/auth');
const router = express.Router();
const {getAllProducts,categoryProducts,getSingleProduct} = require('../controllers/productController')


router.route('/products').get(getAllProducts);
router.route('/products/:id').get(getSingleProduct);
// router.route(`/products/categories`).get(categoryProducts);
// router.route('/cart').get(isAuthenticatedUser,userCart)


module.exports = router