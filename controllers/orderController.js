const orderModel = require("../models/orderModel");
const catchAsyncError = require("../middlewares/catchAsyncError");

const User = require("../models/userModel");
const Cart = require("../models/Cart");
const ErrorHandler = require("../utils/errorHandler");

exports.createOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    user,
    paidAt,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    deliveredAt,
    createdAt,
  } = req.body;

  const newOrder =await  orderModel.create({
    shippingInfo,
    orderItems,
    user,
    paidAt,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    orderStatus,
    deliveredAt,
    createdAt,
  });

  newOrder.save();
  res.status(200).json({
    success:true,
    message:'Order Created Successfully',
    newOrder
  })
});




exports.myOrders = catchAsyncError(async(req,res,next)=>{
    const userId = req.user._id;
    const allOrders = await orderModel.find({user:userId});

    if(!allOrders){
        return next(new ErrorHandler("No Recent Orders",400))
    }
    let totalAmount = 0;

    allOrders.forEach(element => {
        totalAmount+=element.totalPrice;
    });
    res.status(200).json({
        success:true,
        totalAmount,
        allOrders
    })
})


exports.getSingleOrder = catchAsyncError(async(req,res,next)=>{
    const order = await orderModel.find({_id:req.params.id});

    if(!order){
        return next(new ErrorHandler("Order does not exist",400));
    }

    res.status(200).json({
        success:true,
        message:'Order Found Successfully',
        order
    })
})
