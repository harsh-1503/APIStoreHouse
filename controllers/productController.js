const ErrorHandler = require('../utils/errorHandler')
require('express')
const catchAsyncError = require('../middlewares/catchAsyncError')
const product =  require('../models/product')
const jwt = require('jsonwebtoken')
const cart = require('../models/Cart')

const getAllProducts = (catchAsyncError(async(req,res,next)=>{
    const allProducts = await product.find();
    console.log(allProducts);
    res.status(200).json({
        success:true,
        allProducts
    })
}))

const categoryProducts=(catchAsyncError(async(req,res,next)=>{
    const categoryss = await product.find({"category":req.params.category});
    console.log(categoryss);
    res.status(200).json({
        success:true,
        categoryss
    })
}))



const getSingleProduct=(catchAsyncError(async(req,res,next)=>{
    const singleProduct = await product.find({_id:req.params.id});
    console.log(singleProduct);
    res.status(200).json({
        success:true,
        singleProduct
    })

}))

module.exports = {getAllProducts,categoryProducts,getSingleProduct}