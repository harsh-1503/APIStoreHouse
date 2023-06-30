require('express')

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken")
const User = require('../models/userModel')
require('dotenv').config();

exports.isAuthenticatedUser = catchAsyncError(async(req,res,next)=>{
    const  token  = req.headers.cookie;
    console.log("hello",token);
    if(!token){
        return next(new ErrorHandler("Please Login to access this resource",401))
    }
    const decodedData = jwt.verify(token.substr(6),process.env.JWT_SECRET);
    console.log("Decoded",decodedData);
    req.user = await User.findById(decodedData._id);
    console.log(req.user);
    // req.user = await decodedData._id
    next();
})

