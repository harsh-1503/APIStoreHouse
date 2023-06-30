const ErrorHandler = require("../utils/errorHandler");
require("express");
const catchAsyncError = require("../middlewares/catchAsyncError");
// const product =  require('../models/product')
const jwt = require("jsonwebtoken");
const cart = require("../models/Cart");

const userCart = catchAsyncError(async (req, res, next) => {
  const token = req.headers.cookie;
  if (!token) {
    return next(new ErrorHandler("Login to access the Cart"));
  }
  const decodedData = jwt.verify(token.substr(6), process.env.JWT_SECRET);

  const cartFind = await cart.find({ userId: decodedData._id });
  if (!cartFind) {
    return next(new ErrorHandler("Login to acces your cart", 404));
  }

  res.status(200).json({
    success: true,
    cartFind,
  });
});

const addItemToCart = catchAsyncError(async (req, res, next) => {
  const productToBeAdded = req.body.product;

  const filter = {
    userId: req.user._id,
    userCart: { $not: { $elemMatch: { _id: productToBeAdded._id } } },
  };
  const existingProduct = await cart.findOne(filter);
  if (existingProduct) {
    return next(new ErrorHandler("Product already exists in the cart", 300));
  }
  const cartFind = await cart.findOneAndUpdate(
    { userId: req.user._id },
    { $push: { userCart: productToBeAdded } }
  );
  if (!cartFind) {
    return next(new ErrorHandler("Login to acces your cart", 404));
  }

  res.status(200).json({
    success: true,
    cartFind,
  });
});

const removeItemFromCart = catchAsyncError(async (req, res, next) => {
  const itemToBeRemoved = req.body.removeProduct;
  console.log(itemToBeRemoved);
  
  const filter = { userId: req.user._id }; // Replace with the actual document ID
  const update = {
    $pull: { userCart: { _id: itemToBeRemoved._id } },
  };
  const result = await cart.updateOne(filter, update);
  res.status(200).json({
    success: true,
    message: "Item removed from the cart",
  });
});
module.exports = { userCart, addItemToCart, removeItemFromCart };
