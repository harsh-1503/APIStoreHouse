const express = require('express');
const { createOrder, myOrders, getSingleOrder } = require('../controllers/orderController');
const router = express.Router();

router.route('/myOrders').get(myOrders)
router.route('createOrder').post(createOrder)
router.route('/myOrders/:id').get(getSingleOrder)

module.exports = router